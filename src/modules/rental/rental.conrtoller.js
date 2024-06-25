import { ObjectId } from "mongodb";
import { db } from "../../../db/connection.js"


// add rented
export const addRental = async (req, res, next) => {
    try {
        // valid req data
        const { carId, customerId, rentalDate, returnDate } = req.body;
        if (!carId || !customerId || !rentalDate) {
            throw Error('Car ID, Customer ID, and Rental Date are required', { cause: 400 })
        }
        // find car
        const findCar = await db.collection("cars").findOne({ _id: new ObjectId(carId) })
        console.log(findCar);
        if (!findCar) {
            throw Error("car not found", { cause: 404 })
        }
        if (findCar.rentalStatus === 'rented') {
            throw Error("car is not available")
        }
        // find user
        const findUser = await db.collection("users").findOne({ _id: new ObjectId(customerId) })
        if (!findUser) {
            throw Error("user not found", { cause: 404 })
        }
        // add to db
        const rentelCar = {
            carId,
            customerId,
            rentalDate,
            returnDate
        }
        db.collection("rentel").insertOne(rentelCar)
        // Update car rental status
        await db.collection("cars").updateOne(
            { _id: new ObjectId(carId) },
            { $set: { rentalStatus: "rented" } }
        );
        return res.status(200).json({ message: "rental car successfully", success: true })
    }
    catch (err) {
        return res.status(err.cause || 500).json({ message: err.message, success: false })
    }
}

// updateRental
export const updateRental = async (req, res, next) => {
    const { carId, customerId, rentalDate, returnDate } = req.body;
    const { id } = req.params
    try {
        // check is found 
        const isFound = await db.collection("rentel").findOne({ _id: new ObjectId(id) })
        if (!isFound) {
            throw Error("rentel not found", { cause: 404 })
        }
        // find car
        const findCar = await db.collection("cars").findOne({ _id: new ObjectId(carId) })
        console.log(findCar);
        if (!findCar) {
            throw Error("car not found", { cause: 404 })
        }
        if (findCar.rentalStatus === 'rented') {
            throw Error("car is not available")
        }
        // find user
        const findUser = await db.collection("users").findOne({ _id: new ObjectId(customerId) })
        if (!findUser) {
            throw Error("user not found", { cause: 404 })
        }
        // updated
        const updatedRentel = {}
        if (carId) updatedRentel.carId = carId
        if (customerId) updatedRentel.customerId = customerId
        if (rentalDate) updatedRentel.rentalDate = rentalDate
        if (returnDate) updatedRentel.returnDate = returnDate
        db.collection("rentel").updateOne(
            { _id: new ObjectId(id) },
            { $set: updatedRentel }
        )
        return res.status(200).json({ message: "rental updated successfully", success: true })
    }
    catch (err) {
        return res.status(err.cause || 500).json({ message: err.message, success: false })
    }
}

//deleteRental
export const deleteRental = async (req, res, next) => {
    const { id } = req.params
    try {
        const isFound = await db.collection("rentel").findOne({ _id: new ObjectId(id) })
        if (!isFound) {
            throw Error("rentel not found", { cause: 404 })
        }
        const delRentel = await db.collection("rentel").deleteOne({ _id: new ObjectId(id) })
        if (delRentel.deletedCount === 1) {
            return res.status(200).json({ message: "rentel deleted successfully", success: true })
        }
    }
    catch (err) {
        return res.status(err.cause || 500).json({ message: err.message, success: false })
    }
}

// getAllRentel
export const getAllRentel = async (req, res, next) => {
    try {
        const getAllRentels = await db.collection("rentel").find().toArray()
        if (getAllRentels.length === 0) {
            throw Error("rentel not found", { cause: 404 })
        }
        return res.status(200).json({ data: getAllRentels, success: true, count: getAllRentels.length })
    }
    catch (err) {
        return res.status(err.cause || 500).json({ message: err.message, success: false })
    }
}

// getRentel
export const getRentel = async (req, res, next) => {
    try {
        const { id } = req.params
        const isFound = await db.collection("rentel").findOne({ _id: new ObjectId(id) })
        if (!isFound) {
            throw Error("rentel not found", { cause: 404 })
        }
        return res.status(200).json({ data: isFound, success: true })
    }
    catch (err) {
        return res.status(err.cause || 500).json({ message: err.message, success: false })
    }
}