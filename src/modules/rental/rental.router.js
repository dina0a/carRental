import { Router } from "express";
import { addRental, deleteRental, getAllRentel, getRentel, updateRental } from "./rental.conrtoller.js";

const rentalRouter = Router()

rentalRouter.post('/addRental',addRental)
rentalRouter.put('/updateRental/:id',updateRental)
rentalRouter.delete('/deleteRental/:id',deleteRental)
rentalRouter.get('/getAllRentel',getAllRentel)
rentalRouter.get('/getRentel/:id',getRentel)

export default rentalRouter