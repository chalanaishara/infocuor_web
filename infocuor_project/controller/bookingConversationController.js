import BookingConversation from "../models/bookingConversation.js";
import sendEmail from "../utils/sendEmail.js";

export const createBookingConversation = async (req, res) => {
  try {
    const { fullName, email, contactNumber, eventDate, event, reason } =
      req.body;

    // Validation
    if (!fullName || !email || !contactNumber || !eventDate || !event) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be filled",
      });
    }

    // Save to MongoDB
    const booking = await BookingConversation.create({
      fullName,
      email,
      contactNumber,
      eventDate,
      event,
      reason,
    });

    // Send Email
    await sendEmail(booking);

    res.status(201).json({
      success: true,
      message: "Booking conversation saved successfully",
      data: booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};