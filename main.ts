// @deno-types="npm:@types/express@4"
import express from "npm:express@4.18.2";
import mongoose from "npm:mongoose@8.0.1";
import { deleteAllRestaurants } from "./resolvers/deleteAllRestaurants.ts";
import { deleteBooking } from "./resolvers/deleteBooking.ts";
import { deleteRestaurant } from "./resolvers/deleteRestaurant.ts";
import { getBooking } from "./resolvers/getBooking.ts";
import { getClient } from "./resolvers/getClient.ts";
import { getRestaurant } from "./resolvers/getRestaurant.ts";
import { postBooking } from "./resolvers/postBooking.ts";
import { postClient } from "./resolvers/postClient.ts";
import { postRestaurant } from "./resolvers/postRestaurant.ts";

import { load } from "https://deno.land/std@0.204.0/dotenv/mod.ts";

const env = await load();

const MONGO_URL = env.MONGO_URL || Deno.env.get("MONGO_URL");

if (!MONGO_URL) {
    throw new Error("No mongo URL found");
}
  
try {
    await mongoose.connect(MONGO_URL);
    console.log("Conectado a MongoDB Atlas");
} catch (_e) {
    throw new Error("Error al conectarse a MongoDB Atlas");
}

const app = express();

app.get("/client/:id", getClient)
   .get("/restaurant/:id", getRestaurant)
   .get("/booking/:id", getBooking)
   .post("/client", postClient)
   .post("/restaurant", postRestaurant)
   .post("/booking", postBooking)
   .delete("/restaurant/:id", deleteRestaurant)
   .delete("/restaurant", deleteAllRestaurants)
   .delete("/booking/:id", deleteBooking)

app.listen(3000, () => {
    console.log("Server listening on port 3000");
});