import { Router } from "express";
import { addCar, deleteCar, getAllCars, getCar, getCarByModel, getCarHondaToyota, getRentedSpecificModel, getStatusAndModel, updateCar } from "./car.controller.js";

const carRouter = Router()

carRouter.post('/addCar',addCar)
carRouter.get('/getCar/:id',getCar)
carRouter.get('/getAllCars',getAllCars)
carRouter.put('/updateCar/:id',updateCar)
carRouter.delete('/deleteCar/:id',deleteCar)
carRouter.get('/getCarByModel/:model',getCarByModel)
carRouter.get('/getCarByModel/:model',getCarByModel)
carRouter.get('/getCarHondaToyota',getCarHondaToyota)
carRouter.get('/getRentedSpecificModel/:model',getRentedSpecificModel)
carRouter.get('/getStatusAndModel/:rentalStatus/:model',getStatusAndModel)

export default carRouter