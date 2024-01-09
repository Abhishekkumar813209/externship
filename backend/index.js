import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/database.js";
import userRoutes from "./Routes/userRoutes.js"
import chatRoutes from "./Routes/chatRoutes.js"
import messageRoutes from "./Routes/messageRoutes.js"
import {notFound,errorHandler} from "./middleware/errorMiddleware.js"


import cors from 'cors';

//dotenv configuration
dotenv.config({
    path:'./config/config.env'
})

connectDB();
console.log(process.env.MONGO_URI)

const app = express();
app.use(cors({
    origin:"*",
})
);

app.use(express.json())
app.get("/",(req,res)=>{
    res.send("Server is running")
})

app.use("/api/v1",userRoutes)
app.use("/api/v1", chatRoutes);
app.use("/api/v1", messageRoutes);

app.use(notFound);
app.use(errorHandler);


const PORT  = process.env.PORT

app.listen(PORT,console.log(`Server is running at port ${PORT}`))