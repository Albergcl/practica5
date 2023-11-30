// @deno-types="npm:@types/express@4"
import { Request, Response } from "npm:express@4.18.2";
import { RestaurantModel } from "../db/restaurant.ts";


export const deleteRestaurant = async (req: Request, res: Response) => {
    try{
        const restaurantId = req.params.id;
        await RestaurantModel.findByIdAndDelete(restaurantId);
        res.status(200).send("Restaurante borrado correctamente");
    }catch(_e){
        res.status(500).send("Error al borrar el restaurante");
    }
};