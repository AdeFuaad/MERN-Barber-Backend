import { User } from "../models/userModel.js";
import { Appointment } from "../models/appointmentModel.js"; // adjust the path as needed

// Create a new user
export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password, // Note: Hash this password before storing
      phoneNumber: req.body.phoneNumber,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all Users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().populate("appointments");
    console.log("Populated Users:", users); // Debugging line

    if (!users) {
      return res.status(404).json({
        message: "No users found",
      });
    }

    return res.status(200).json({
      count: users.length,
      data: users,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
};

// Get user details by ID
export const getUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId).populate("appointments");
    console.log("Populated User:", user); // Debugging line

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.log(error.message); // Debugging line
    res.status(500).json({ message: error.message });
  }
};

// Update user details
export const updateUser = async (req, res) => {
  const userId = req.params.id;
  const updates = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new Appointment for a Customer
export const createAppointmentForUser = async (req, res) => {
  try {
    const userId = req.params.id; // or from wherever you get the user's ID
    const { date, time, service } = req.body;

    const newAppointment = new Appointment({
      date: date,
      time: time,
      service: service,
      customer: userId,
    });

    await newAppointment.save();

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    user.appointments.push(newAppointment._id);
    await user.save();

    res.status(200).send("Appointment created and associated successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Add appointment to a user
export const addAppointmentToUser = async (req, res) => {
  const userId = req.params.id;
  const { appointmentId } = req.body;

  try {
    const user = await User.findById(userId);
    const appointment = await Appointment.findById(appointmentId);

    if (!user || !appointment) {
      return res.status(404).json({ message: "User or appointment not found" });
    }

    user.appointments.push(appointment._id);
    user.updatedAt = new Date();

    await user.save();

    res.status(200).json({ message: "Appointment added to user" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
