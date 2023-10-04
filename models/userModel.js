import mongoose from "mongoose";
import { Appointment } from "./appointmentModel.js";

const userSchema = mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  phoneNumber: String,
  appointments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
    },
  ],
  createdAt: Date,
  updatedAt: Date,
});

export const User = mongoose.model("User", userSchema);
