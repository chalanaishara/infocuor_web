import mongoose from "mongoose";

const bookingConversationSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      match: /.+\@.+\..+/,
    },
    contactNumber: {
      type: String,
      required: true,
    },
    eventDate: {
      type: Date,
      required: true,
    },
    event: {
      type: String,
      required: true,
    },
    reason: {
      type: String,
    },
  },
  { timestamps: true }
);

const BookingConversation = mongoose.model("BookingConversation", bookingConversationSchema);

export default BookingConversation;