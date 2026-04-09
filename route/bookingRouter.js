import express from 'express';
import { cancelBooking, createBooking, getUserBookings } from '../controller/bookingController.js';


const bookingRouter=express.Router();

bookingRouter.post("/",  createBooking);
bookingRouter.get("/", getUserBookings);
bookingRouter.delete("/id", cancelBooking);

export default bookingRouter