// import modules 
import { Router } from "express";
import { deleteUser, getAllUsers, getUser, logIn, signUp, updateUser } from "./user.controller.js";

// create router
const userRouter = Router()

// sign up
userRouter.post('/signUp', signUp)
userRouter.post('/logIn', logIn)
userRouter.get('/getUser/:id', getUser)
userRouter.get('/getAllUsers', getAllUsers)
userRouter.put('/updateUser/:id', updateUser)
userRouter.delete('/deleteUser/:id', deleteUser)

// export router
export default userRouter