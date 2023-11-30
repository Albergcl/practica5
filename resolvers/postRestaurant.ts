// @deno-types="npm:@types/express@4"
import { Request, Response } from "npm:express@4.18.2";
import { RestaurantModel } from "../db/restaurant.ts";
import { Restaurant } from "../types.ts";

export const postRestaurant = async (req: Request, res: Response) => {
    try{
        const restaurantData: Restaurant = req.body;
        const newRestaurant = await RestaurantModel.create(restaurantData);
        res.status(201).send(newRestaurant);
    }catch(_e){
        res.status(500).send("Error al crear el restaurante");
    }
};