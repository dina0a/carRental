// import modules
import express from 'express'
import { connectDB } from './db/connection.js'
import userRouter from './src/modules/user/user.router.js'
import carRouter from './src/modules/car/car.router.js'
import rentalRouter from './src/modules/rental/rental.router.js'

// create server
const app = express()
const port = 3000

app.use(express.json())

app.use(userRouter)
app.use(carRouter)
app.use(rentalRouter)

connectDB()

// listen on server
app.listen(port,()=>{
    console.log("server is running on port...",port);
})