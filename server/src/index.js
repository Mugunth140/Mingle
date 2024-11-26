//Global imports
import dotenv from "dotenv"
import express from "express"
import cookieParser from "cookie-parser"

//local imports
import { connectDB } from "./lib/db.js"
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"

//app configuration
dotenv.config()
const app = express()
const PORT = process.env.PORT

//middleware
app.use(express.json())
app.use(cookieParser())

//authentication Routes
app.use("/api/auth", authRoutes)
app.use("/api/message", messageRoutes)

//index routes
app.get("/", (req, res) => {
    res.send("<h1>Server Running Successfully</h1>")
})

// server listerning function
app.listen(PORT || 5000,  () => {
    console.log(`server running on http://localhost:${PORT}`)
    connectDB()
})