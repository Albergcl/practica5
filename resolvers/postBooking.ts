// @deno-types="npm:@types/express@4"
import { Request, Response } from "npm:express@4.18.2";
import { BookingModel } from "../db/booking.ts";
import { Booking } from "../types.ts";

export const postBooking = async (req: Request, res: Response) => {
    try{
        const bookingData: Booking = req.body;
        const newBooking = await BookingModel.create(bookingData);
        res.status(201).send(newBooking);
    }catch(_e){
        res.status(500).send("Error al crear la reserva");
    }
};