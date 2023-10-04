// Initialize my index.js in my backend for my MERN project
import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import cors from "cors";
import barberRoutes from "./routes/barberRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import appointmentsRoutes from "./routes/appointmentRoutes.js";

const app = express();

// Middlewares
app.use(express.json());

// CORS
// app.use(cors());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

// Basic home route
app.get("/", (req, res) => {
  return res.status(200).send("Hello World");
});

// Routes
app.use("/barbers", barberRoutes);
app.use("/users", userRoutes);
app.use("/appointments", appointmentsRoutes);

// Database connection and server start
mongoose
  .connect(mongoDBURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB is connected");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
