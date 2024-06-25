import { db } from "../../../db/connection.js"
import bcrypt from 'bcrypt'
import { ObjectId } from 'mongodb'


// signUp
export const signUp = async (req, res, next) => {
    try {
        // get data from req
        const { name, email, password, phone } = req.body
        // check existence
        const userExist = await db.collection("users").findOne({ email: email }) // return {} , undefined
        if (userExist) {
            throw Error("user already exist", { cause: 409 })
        }
        // add to db
        const hashPassword = bcrypt.hashSync(password, 10)
        const user = {
            name,
            email,
            password: hashPassword,
            phone
        }
        db.collection('users').insertOne(user)
        // send response
        return res.status(201).json({ message: "user added successfully", success: false })
    } catch (err) {
        return res.status(err.cause || 500).json({ message: err.message, success: false })
    }
}

// logIn
export const logIn = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const loginUser = await db.collection("users").findOne({ email: email })
        if (!loginUser) {
            throw Error("user not found", { cause: 404 })
        }
        if (bcrypt.compareSync(password, loginUser.password) === false) {
            throw Error("invalid credentials", { cause: 400 })
        }
        return res.status(201).json({ message: `welcome ${loginUser.name}`, success: true })
    }
    catch (err) {
        return res.status(err.cause || 500).json({ message: err.message, success: false })
    }
}

// Get a specific user
export const getUser = async (req, res, next) => {
    const { id } = req.params
    try {
        const user = await db.collection("users").findOne({ _id: new ObjectId(id) }, { projection: { password: 0 } })
        if (!user) {
            throw Error("user not found", { cause: 404 })
        }
        return res.json({ data: user, success: true })
    }
    catch (err) {
        return res.status(err.cause || 500).json({ message: err.message, success: false })
    }
}

// get all users
export const getAllUsers = async (req, res, next) => {
    try {
        const users = await db.collection("users").find({}, { projection: { password: 0 } }).toArray()
        if (users.length === 0) {
            throw Error("users not found", { cause: 404 })
        }
        return res.json({ data: users, success: true })
    }
    catch (err) {
        return res.status(err.cause || 500).json({ message: err.message, success: false })
    }
}

// update user
export const updateUser = async (req, res, next) => {
    const { name, email, password, phone } = req.body
    const { id } = req.params
    try {
        const user = await db.collection("users").findOne({ _id: new ObjectId(id) })
        if (!user) {
            throw Error("user not found to update", { cause: 404 })
        }
        // update 
        const updateFildes = {}
        if (name) updateFildes.name = name
        if (email) updateFildes.email = email
        if (password) updateFildes.password = password
        if (phone) updateFildes.phone = phone;

        const result = await db.collection("users").updateOne(
            { _id: new ObjectId(id) },
            { $set: updateFildes }
        )
        return res.json({ message: 'User updated successfully', success: true });
    }
    catch (err) {
        return res.status(err.cause || 500).json({ message: err.message, success: false })
    }
}

// delete user
export const deleteUser = async (req, res, next) => {
    const { id } = req.params
    try {
        const user = await db.collection("users").findOne({ _id: new ObjectId(id) })
        if (!user) {
            throw Error("user not found to delete", { cause: 404 })
        }
        const delUser = await db.collection("users").deleteOne({ _id: new ObjectId(id) })
        if (delUser.deletedCount === 1) {
            return res.status(200).json({ message: "user deleted successfully", success: true })
        }
    }
    catch (err) {
        return res.status(err.cause || 500).json({ message: err.message, success: false })
    }
}