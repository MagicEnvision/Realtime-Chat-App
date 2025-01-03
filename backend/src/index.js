import express from "express";
import dotenv from "dotenv"
import cookieParser from "cookie-parser"


dotenv.config();
import {connectDB} from "./lib/db.js"
import authRoutes from "./routes/auth.route.js"

const app = express()

const PORT = process.env.PORT;



app.use(express.json())
app.use("/api/auth", authRoutes)
app.use(cookieParser())
app.listen(PORT, () => {
    console.log("Server is running on port "+ PORT)
    connectDB();
}) 