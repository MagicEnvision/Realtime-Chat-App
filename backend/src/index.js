import express from "express";
import dotenv from "dotenv"


dotenv.config();
import {connectDB} from "./lib/db.js"
import authRoutes from "./routes/auth.route.js"

const app = express()

const PORT = process.env.PORT;

app.use("/api/auth", authRoutes)

app.use(express.json())

app.listen(PORT, () => {
    console.log("Server is running on port "+ PORT)
    connectDB();
})