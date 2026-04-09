import express from 'express';
import { createUser, loginUser } from '../controller/userControler.js';

const userRouter=express.Router();

userRouter.post("/",createUser)
userRouter.post("/",loginUser)

export default userRouter;
