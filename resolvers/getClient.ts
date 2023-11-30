// @deno-types="npm:@types/express@4"
import { Request, Response } from "npm:express@4.18.2";
import { ClientModel } from "../db/client.ts";

export const getClient = async (req: Request, res: Response) => {
    try{
        const clientID = req.params.id;
        const client = await ClientModel.findById(clientID);
        res.status(200).send(client);
    }catch(_e){
        res.status(500).send("Error al obtener el cliente");
    }
};