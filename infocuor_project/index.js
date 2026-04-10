import express from 'express';
import userRouter from './route/userRouter.js';
import eventRouter from './route/eventRouter.js';
import bookingRouter from './route/bookingRouter.js';
import mongoose from 'mongoose';

const app=express();

mongoose.connect("mongodb+srv://chalanaishara563_db_user:123@web.8unhd4n.mongodb.net/infocuor?appName=web").then(()=>{
    console.log("connected to the database")
}).catch(()=>{
    console.log("connection field")
})

app.use("users",userRouter)
app.use("events",eventRouter)
app.use("/api/bookings",bookingRouter )

app.listen(5000,()=>{
    console.log("server is running on port 5000");
})