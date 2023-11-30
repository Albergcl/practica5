// @deno-types="npm:@types/express@4"
import { Request, Response } from "npm:express@4.18.2";
import { RestaurantModel } from "../db/restaurant.ts";


export const deleteAllRestaurants = async (_req: Request, res: Response) => {
    try{
        await RestaurantModel.deleteMany({});
        res.status(200).send("Todos los restaurantes borrados correctamente");
    }catch(_e){
        res.status(500).send("Error al borrar los restaurantes");
    }
};