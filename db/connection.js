// import modules
import { MongoClient } from "mongodb";

// create connection 
let url = 'mongodb://localhost:27017'
const client = new MongoClient(url)

// check connection
const connectDB = () => {
    return client.connect().then(() => {
        console.log("db connected successfully");
    }).catch((err) => {
        console.log("field connect to db");
    })
}

// create db 
const db = client.db("carSystem")

// export
export {
    db,
    connectDB
}