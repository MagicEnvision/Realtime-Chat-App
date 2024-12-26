import mongoose from "mongoose"
import dotenv from "dotenv"


dotenv.config();
export const connectDB = async  () => {
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log(`MongoDb Connection: ${(mongoose.connection.readyState)}`)
        //0: disconnected; 1: connected; 2: connecting; 3: disconnecting
    } catch (err) {
        console.log("Error connection to mongodb" + err)


    }
}