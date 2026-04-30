import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import userRouter from "./route/userRouter.js";
import eventRouter from "./route/eventRouter.js";
import bookingRouter from "./route/bookingRouter.js";
import bookingNormalRouter from "./route/bookingNormalRouter.js";
import bookingConversationRouter from "./route/bookingConversationRouter.js";

const app = express();

app.use(express.json());
app.use(cors());

const MONGO_URL =
  "mongodb+srv://chalanaishara563_db_user:123@web.8unhd4n.mongodb.net/infocuor?retryWrites=true&w=majority";

const startServer = async () => {
  try {
    await mongoose.connect(MONGO_URL);

    console.log("connected to database");

    // 👉 ONLY mount routes AFTER connection is ready
    app.use("/users", userRouter);
    app.use("/events", eventRouter);
    app.use("/api/bookings", bookingRouter);
    app.use("/api/normal-booking", bookingNormalRouter);
    app.use("/api", bookingConversationRouter);

    app.listen(5000, () => {
      console.log("server is running on port 5000");
    });

  } catch (err) {
    console.log("DB connection error:", err.message);
  }
};

startServer();