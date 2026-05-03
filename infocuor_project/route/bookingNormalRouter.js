import express from "express";
import { createBooking } from "../controller/bookingNormalController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// 🔒 ONLY logged-in users can access
router.post("/", protect, createBooking);

export default router;