import express from "express";
import cors from "cors";
import connectDB from "./configs/db.js";
import dotenv from 'dotenv/config.js';
import userRouter from "./routers/userRoute.js";

const app=express();


const PORT =process.env.PORT || 3000;
//connection database

await connectDB();

app.use(express.json())
app.use(cors())

app.get('/',(req,res)=>res.send("Server is live.."))

app.use('/api/users',userRouter)

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});

