// @deno-types="npm:@types/express@4"
import { Request, Response } from "npm:express@4.18.2";
import { ClientModel } from "../db/client.ts";
import { Client } from "../types.ts";

export const postClient = async (req: Request, res: Response) => {
    try{
        const { firstName, lastName, email, phoneNumber, DNI, bookings } = req.body;
        const newClient = new ClientModel({ firstName, lastName, email, phoneNumber, DNI, bookings });
        await newClient.save();
        res.status(200).send(newClient);
    }catch(_e){
        res.status(500).send("Error al crear el cliente");
    }
};