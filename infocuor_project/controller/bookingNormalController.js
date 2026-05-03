import BookingNormal from "../models/bookingNormal.js";
import sendEmail from "../utils/sendEmail.js";

export const createBooking = async (req, res) => {
  try {
    const { name, event, email, contactNumber } = req.body;

    const booking = await BookingNormal.create({
      name,
      event,
      email,
      contactNumber,
      user: req.user.id, 
      
    });

    try {
      await sendEmail(booking);
    } catch (emailError) {
      console.log("Email failed:", emailError.message);
    }

    return res.status(201).json({
      message: "Booking successful",
      booking,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error creating booking",
      error: error.message,
    });
  }
};