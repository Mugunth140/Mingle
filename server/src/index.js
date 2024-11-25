import dotenv from "dotenv"
import express from "express"

dotenv.config()
const app = express()
const PORT = process.env.PORT

app.get("/", (req, res) => {
    res.send("<h1>It's an chat application</h1>")
})

app.listen(PORT || 5000,  () => {
    console.log(`server running on http://localhost:${PORT}`)
})