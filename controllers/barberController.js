import { Barber } from "../models/barberModel.js";
import { Appointment } from "../models/appointmentModel.js";

// Create a new Barber
export const createBarber = async (req, res) => {
  try {
    const newBarber = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password, // Note: Hash this password before storing
      location: {
        latitude: req.body.location.latitude,
        longitude: req.body.location.longitude,
      },
      specialty: req.body.specialty,
      pricing: req.body.pricing,
      availability: req.body.availability,
    };

    const barber = await Barber.create(newBarber);
    return res.status(201).send(barber);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
};

// Get all Barbers
export const getBarbers = async (req, res) => {
  try {
    const barbers = await Barber.find({});
    return res.status(200).json({
      count: barbers.length,
      data: barbers,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
};

// Get a Barber by ID
export const getBarberById = async (req, res) => {
  const { id } = req.params;
  try {
    const barber = await Barber.findById(id).populate("appointments");
    return res.status(200).send(barber);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
};

// Update a Barber by ID
export const updateBarber = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBarber = await Barber.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedBarber) {
      return res.status(404).send("Barber not found");
    }
    return res.status(200).send(updatedBarber);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
};

// Delete a Barber by ID
export const deleteBarber = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBarber = await Barber.findByIdAndDelete(id);
    if (!deletedBarber) {
      return res.status(404).send("Barber not found");
    }
    return res.status(200).send("Barber deleted successfully");
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
};

// Create a new Appointment for a Barber
export const createAppointmentForBarber = async (req, res) => {
  const { id } = req.params; // Assume the barber's ID is in the URL
  try {
    // Create a new appointment
    const newAppointment = {
      date: req.body.date,
      time: req.body.time,
      service: req.body.service,
      customer: req.body.customer,
    };
    const appointment = await Appointment.create(newAppointment);

    // Add the appointment to the barber's appointments array
    const barber = await Barber.findById(id);
    if (!barber) {
      return res.status(404).send("Barber not found");
    }
    barber.appointments.push(appointment._id);
    await barber.save();

    return res.status(201).send({
      message: "Appointment successfully created",
      appointment,
      barber,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
};

// Add an appointment to a barber
export const addAppointmentToBarber = async (req, res) => {
  const barberId = req.params.barberId;
  const { appointmentId } = req.body;

  const barber = await Barber.findById(barberId);

  if (!barber) {
    return res.status(404).json({ message: "Barber not found" });
  }

  // Add appointmentId to barber's appointments
  barber.appointments.push(appointmentId);

  // Save and send response
  await barber.save();
  res.status(200).json(barber);
};
