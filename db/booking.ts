import mongoose from "npm:mongoose@8.0.1";
import { Booking } from "../types.ts";
import { ClientModel } from "./client.ts";
import { RestaurantModel } from "./restaurant.ts";

const Schema = mongoose.Schema

const bookingSchema = new Schema(
    {
        date: { type: Date , default: Date()},
        clientID: { type: Schema.Types.ObjectId, ref: "Client" },
        restaurantID: { type: Schema.Types.ObjectId, ref: "Restaurant" }
    },
    { timestamps: true}
);

bookingSchema.pre("save", async function (next) {
    const booking = this;

    try{
        const clientExists = await ClientModel.exists({ _id: booking.clientID });
        if (!clientExists) {
            throw new Error("Cliente no encontrado");
        }
      
        const restaurantExists = await RestaurantModel.exists({ _id: booking.restaurantID });
        if (!restaurantExists) {
            throw new Error("Restaurante no encontrado");
        }
        
        await ClientModel.findByIdAndUpdate(booking.clientID, { $push: { bookings: booking._id } });
        await RestaurantModel.findByIdAndUpdate(booking.restaurantID, { $push: { bookings: booking._id } });
        next();
    }catch(e){
        next(e);
    }
});

/*Me da un error que no se como solucionar ni de donde viene. Por favor, me podrias ayudar?

    bookingSchema.pre("deleteOne", async function (next) {
    const booking = this;

    try{
        await ClientModel.findByIdAndUpdate(booking.clientID, { $pull: { bookings: booking._id } });
        await RestaurantModel.findByIdAndUpdate(booking.restaurantID, { $pull: { bookings: booking._id } });
        next();
    }catch(e){
        next(e);
    }
});*/

export type BookingModelType = mongoose.Document & Omit<Booking, "id">

export const BookingModel = mongoose.model<BookingModelType>("Booking", bookingSchema);