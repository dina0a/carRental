import { ObjectId } from "mongodb"
import { db } from "../../../db/connection.js"

// add car
export const addCar = async (req, res, next) => {
    const { name, model, rentalStatus } = req.body
    try {
        const car = {
            name,
            model,
            rentalStatus
        }
        const addCar = await db.collection("cars").insertOne(car)

        return res.status(201).json({ message: "car added successsfully", success: true })
    }
    catch (err) {
        return res.status(err.cause || 500).json({ message: err.message, success: false })
    }
}

// get car
export const getCar = async (req, res, next) => {
    const { id } = req.params
    try {
        const isFound = await db.collection("cars").findOne({ _id: new ObjectId(id) })
        if (!isFound) {
            throw Error("car not found", { cause: 404 })
        }
        return res.status(201).json({ data: isFound, success: true })
    }
    catch (err) {
        return res.status(err.cause || 500).json({ message: err.message, success: false })
    }
}

// getAllCars
export const getAllCars = async (req, res, next) => {
    try {
        const allCars = await db.collection("cars").find().toArray()
        if (allCars.length === 0) {
            throw Error("cars not found", { cause: 404 })
        }
        return res.status(201).json({ data: allCars, success: true, numOfCars: allCars.length })
    }
    catch (err) {
        return res.status(err.cause || 500).json({ message: err.message, success: false })
    }
}

// updateCar
export const updateCar = async (req, res, next) => {
    const { name, model, rentalStatus } = req.body
    const { id } = req.params
    try {
        const isFound = await db.collection("cars").findOne({ _id: new ObjectId(id) })
        if (!isFound) {
            throw Error("car not found", { cause: 404 })
        }
        // update car
        const newUpdate = {}
        if (name) newUpdate.name = name
        if (model) newUpdate.model = model
        if (rentalStatus) newUpdate.rentalStatus = rentalStatus
        db.collection("cars").updateOne(
            { _id: new ObjectId(id) },
            { $set: newUpdate }
        )
        return res.status(200).json({ message: "car updated successfully", success: true })
    }
    catch (err) {
        return res.status(err.cause || 500).json({ message: err.message, success: false })
    }
}

// deleteCar
export const deleteCar = async (req, res, next) => {
    const { id } = req.params
    try {
        const isFound = await db.collection("cars").findOne({ _id: new ObjectId(id) })
        if (!isFound) {
            throw Error("car not found", { cause: 404 })
        }
        const deldCar = await db.collection("cars").deleteOne({ _id: new ObjectId(id) })
        if (deldCar.deletedCount === 1) {
            return res.status(200).json({ message: "car deleted successfully", success: true })
        }
    }
    catch (err) {
        return res.status(err.cause || 500).json({ message: err.message, success: false })
    }
}

// getCarHondaToyota
export const getCarHondaToyota = async (req, res, next) => {
    try {
        const isFound = await db.collection("cars").find().toArray()
        if (isFound.length == 0) {
            throw Error("cars not found", { cause: 404 })
        }
        const filteredCars = isFound.filter(car => car.name === 'honda' || car.name === 'toyota');
        if (filteredCars.length == []) {
            throw Error("honda or toyota not found", { cause: 404 })
        }

        return res.status(200).json({ data: filteredCars, success: true });
    }
    catch (err) {
        return res.status(err.cause || 500).json({ message: err.message, success: false })
    }
}

// getCarByModel
export const getCarByModel = async (req, res, next) => {
    const { model } = req.params
    try {
        const isFound = await db.collection("cars").find({ model: model }).toArray()
        if (isFound.length === 0) {
            throw Error("this model is not found", { cause: 404 })
        }
        return res.status(200).json({ data: isFound, success: true })
    }
    catch (err) {
        return res.status(err.cause || 500).json({ message: err.message, success: false })
    }
}

// getRentedSpecificModel
export const getRentedSpecificModel = async (req, res, next) => {
    try {
        const { model } = req.params
        const isFound = await db.collection("cars").find({ model: model }).toArray()
        if (isFound.length === 0) {
            throw Error("this model is not found", { cause: 404 })
        }
        const filterCar = isFound.filter((car) => {
            if (car.rentalStatus == 'rented') {
                return car
            }
        })
        if (filterCar.length === 0) {
            throw Error("this model is not rented", { cause: 404 })
        }
        return res.status(200).json({ data: filterCar, success: true })
    }
    catch (err) {
        return res.status(err.cause || 500).json({ message: err.message, success: false })
    }
}

// getStatusAndModel

export const getStatusAndModel = async (req, res, next) => {
    const { rentalStatus, model } = req.params
    try {
        const isFound = await db.collection("cars").find({ rentalStatus, model }).toArray()
        console.log(isFound);
        if (isFound.length === 0) {
            throw Error("this model is not found", { cause: 404 })
        }
        return res.status(200).json({ data: isFound, success: true })
    } catch (err) {
        return res.status(err.cause || 500).json({ message: err.message, success: false })
    }
}