import mongoose from "mongoose";

const bookingNormalSchema = new mongoose.Schema(
  {

     user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    
    name: {
      type: String,
      required: true,
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
    event: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const BookingNormal = mongoose.model("BookingNormal", bookingNormalSchema);

export default BookingNormal;