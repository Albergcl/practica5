import mongoose from "npm:mongoose@8.0.1";
import { Client } from "../types.ts";
import { BookingModel } from "./booking.ts";

const Schema = mongoose.Schema;

const clientSchema = new Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true, unique: true, validate: {validator: function(v){return /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(v)}, message: "Invalid email"} }, //Validacion sacada de: https://datoweb.com/post/433-validar-correo-electrnico-con-javascript
        phoneNumber: {type: Number, unique: true, validate: {validator: function(v){return /\d{9}/.test(v)}, message: "Invalid phone number"} },
        DNI: { type: String, required: true, unique: true, validate: {validator: function(v){return /^(\d{8})([A-Z])$/.test(v)}, message: "Invalid DNI"} }, //Validacion sacada de: https://gist.github.com/afgomez/5691823
        bookings: [{ type: Schema.Types.ObjectId, ref: "Booking" }]
    },
    { timestamps: true}
);

/*Me da un error que no se como solucionar ni de donde viene. Por favor, me podrias ayudar?

    clientSchema.pre("deleteMany", async function (next) {
    const client = this;

    try{
        await BookingModel.deleteMany({ clientID: client._id });
        next();
    }catch(e){
        next(e);
    }
});*/

export type ClientModelType = mongoose.Document & Omit<Client, "id">

export const ClientModel = mongoose.model<ClientModelType>("Client", clientSchema);