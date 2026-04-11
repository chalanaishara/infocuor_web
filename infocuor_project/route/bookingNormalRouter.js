import express from "express";
import { createBooking } from "../controller/bookingNormalController.js";

const router = express.Router();

router.post("/", createBooking);

export default router;