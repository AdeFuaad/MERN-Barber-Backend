import express from "express";
import {
  createBarber,
  getBarbers,
  getBarberById,
  updateBarber,
  deleteBarber,
  createAppointmentForBarber,
  addAppointmentToBarber,
} from "../controllers/barberController.js";

const router = express.Router();

router.post("/", createBarber);
router.get("/", getBarbers);
router.get("/:id", getBarberById);
router.put("/:id", updateBarber);
router.delete("/:id", deleteBarber);
router.post("/:id/create-appointment", createAppointmentForBarber);
router.post("/:barberId/add-appointment", addAppointmentToBarber);

export default router;
