// @deno-types="npm:@types/express@4"
import { Request, Response } from "npm:express@4.18.2";
import { BookingModel } from "../db/booking.ts";

export const deleteBooking = async (req: Request, res: Response) => {
    try{
        const bookingId = req.params.id;
        await BookingModel.findOneAndDelete({bookingId});
        res.status(200).send("Reserva borrada correctamente");
    }catch(_e){
        res.status(500).send("Error al borrar la reserva");
    }
};