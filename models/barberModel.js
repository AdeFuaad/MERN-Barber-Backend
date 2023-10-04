import mongoose from "mongoose";

const barberSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String,
    default: "default.jpg",
  },
  location: {
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
  },
  ratings: {
    type: Number,
    default: 0,
  },
  numberOfRatings: {
    type: Number,
    default: 0,
  },
  specialty: {
    type: [String], // Array of hair types the barber specializes in
    required: true,
  },
  pricing: {
    basicCut: Number,
    cutAndBeard: Number,
    lineUp: Number,
    completePackage: Number,
  },
  availability: {
    Monday: [String],
    Tuesday: [String],
    Wednesday: [String],
    Thursday: [String],
    Friday: [String],
    Saturday: [String],
    Sunday: [String],
  },
  appointments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
    },
  ],
  sponsored: {
    type: Boolean,
    default: false,
  },
  sponsorBrand: {
    type: String,
    default: "",
  },
});

export const Barber = mongoose.model("Barber", barberSchema);
