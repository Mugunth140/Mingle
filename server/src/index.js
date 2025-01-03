//Global imports
import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
//import path from "path";

//local imports
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

//socket server
import { app, server } from "./lib/socket.js";

//app configuration
dotenv.config();
const PORT = process.env.PORT;
//const __dirname = path.resolve();

//middleware
app.use(express.json({ limit: '3mb' }));
app.use(express.urlencoded({ limit: '3mb', extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: 'https://mingle-client.vercel.app',  // Adjust this to your frontend's domain
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // Allow cookies or authorization headers
}));

//authentication Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

app.get("/", (req, res) => {
  res.send("<center><h1>Mingle Backend</h1></center>");
});

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../client/dist")));

//   app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "../client", "dist", "index.html"));
//   });
// }

server.listen(PORT, () => {
  console.log("server is running on PORT:" + PORT);
  connectDB();
});
