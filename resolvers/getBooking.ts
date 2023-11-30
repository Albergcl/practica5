// @deno-types="npm:@types/express@4"
import { Request, Response } from "npm:express@4.18.2";
import { BookingModel } from "../db/booking.ts";


export const getBooking = async (req: Request, res: Response) => {
    try{
        const bookingID = req.params.id;
        const booking = await BookingModel.findById(bookingID);
        res.status(200).send(booking);
    }catch(_e){
        res.status(500).send("Error al obtener la reserva");
    }
};