// @deno-types="npm:@types/express@4"
import { Request, Response } from "npm:express@4.18.2";
import { RestaurantModel } from "../db/restaurant.ts";


export const getRestaurant = async (req: Request, res: Response) => {
    try{
        const restaurantID = req.params.id;
        const restaurant = await RestaurantModel.findById(restaurantID);
        res.status(200).send(restaurant);
    }catch(_e){
        res.status(500).send("Error al obtener el restaurante");
    }
};