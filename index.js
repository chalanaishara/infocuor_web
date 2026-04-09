import express from 'express';
import userRouter from './route/userRouter.js';
import eventRouter from './route/eventRouter.js';

const app=express();

app.use("users",userRouter)
app.use("events",eventRouter)

app.listen(5000,()=>{
    console.log("server is running on port 5000");
})