import express from "express";
const router = express.Router();

import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  addAppointmentToUser,
  createAppointmentForUser,
} from "../controllers/userController.js";

router.post("/", createUser);
router.get("/", getUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.post("/:id/appointments", addAppointmentToUser);
router.post("/:id/create-appointment", createAppointmentForUser);

export default router;
