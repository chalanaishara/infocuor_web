import express from "express";
import { createBookingConversation } from "../controller/bookingConversationController.js";


const router = express.Router();

router.post("/booking-conversation", createBookingConversation);

export default router;