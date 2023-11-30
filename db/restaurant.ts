import mongoose from "npm:mongoose@8.0.1";
import { Restaurant } from "../types.ts";
import { BookingModel } from "./booking.ts";

const Schema = mongoose.Schema;

const restaurantSchema = new Schema(
    {
        name: { type: String, required: true, unique: true },
        CIF: { type: String, required: true, unique: true, validate: {validator: function(v){return /^([ABCDEFGHJKLMNPQRSUVW])(\d{7})([0-9A-J])$/.test(v)}, message: "Invalid CIF"} }, //Validacion sacada de: https://gist.github.com/afgomez/5691823
        address: { type: String, required: true },
        bookings: [{ type: Schema.Types.ObjectId, ref: "Booking" }]
    },
    { timestamps: true}
);

/*Me da un error que no se como solucionar ni de donde viene. Por favor, me podrias ayudar?

    restaurantSchema.pre("deleteMany", async function (next) {
    const restaurant = this;

    try{
        await BookingModel.deleteMany({ restaurantID: restaurant._id });
        next();
    }catch(e){
        next(e);
    }
});*/

export type RestaurantModelType = mongoose.Document & Omit<Restaurant, "id">;

export const RestaurantModel = mongoose.model<RestaurantModelType>("Restaurant", restaurantSchema);