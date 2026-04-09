import express from 'express';
import userRouter from './route/userRouter.js';

const app=express();

app.use("users",userRouter)

app.listen(5000,()=>{
    console.log("server is running on port 5000");
})