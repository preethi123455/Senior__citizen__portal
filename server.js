// mergedServer.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

// =======================
// MongoDB Atlas Connection
// =======================
const MONGO_URI = "mongodb+srv://preethi:Preethi123@cluster0.ac2ywxc.mongodb.net/seniorEaseBookings?retryWrites=true&w=majority";


mongoose.connect(MONGO_URI)

  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

// =======================
// Doctor and Appointment Schemas
// =======================

// Doctor Schema
const doctorSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  licenseNumber: { type: String, required: true },
  experience: { type: Number, required: true },
  specialization: { type: String, required: true },
  document: { type: String, required: true },
});

// Appointment Schema
const appointmentSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  selectedDoctor: { type: String, required: true },
  appointmentDate: { type: String, required: true },
  appointmentTime: { type: String, required: true },
  meetLink: { type: String, required: true },
});

// Removed Appointments Schema
const removedAppointmentSchema = new mongoose.Schema({
  userEmail: String,
  selectedDoctor: String,
  appointmentDate: String,
  appointmentTime: String,
  deletedAt: { type: Date, default: Date.now }
});

// Models
const Doctor = mongoose.model("Doctor", doctorSchema);
const Appointment = mongoose.model("Appointment", appointmentSchema);
const RemovedAppointment = mongoose.model("RemovedAppointment", removedAppointmentSchema);

// =======================
// Multer Configuration (For Doctor Document Upload)
// =======================
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// =======================
// Doctor Routes
// =======================

// Get all doctors
app.get("/doctors", async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch doctors" });
  }
});

// Add a doctor with document upload
app.post("/doctors", upload.single("document"), async (req, res) => {
  try {
    const newDoctor = new Doctor({
      fullName: req.body.fullName,
      licenseNumber: req.body.licenseNumber,
      experience: req.body.experience,
      specialization: req.body.specialization,
      document: req.file.path,
    });
    await newDoctor.save();
    res.status(201).json(newDoctor);
  } catch (error) {
    res.status(500).json({ error: "Failed to add doctor" });
  }
});

// =======================
// Appointment Routes
// =======================

// Book an appointment
app.post("/appointments", async (req, res) => {
  try {
    const { userEmail, selectedDoctor, appointmentDate, appointmentTime, meetLink } = req.body;

    const existingAppointment = await Appointment.findOne({ selectedDoctor });
    if (existingAppointment) {
      return res.status(400).json({ error: "This doctor is already booked for an appointment." });
    }

    const newAppointment = new Appointment({ userEmail, selectedDoctor, appointmentDate, appointmentTime, meetLink });
    await newAppointment.save();
    res.status(201).json(newAppointment);
  } catch (error) {
    res.status(500).json({ error: "Failed to book appointment" });
  }
});

// Get appointments (optional filter by userEmail)
app.get("/appointments", async (req, res) => {
  try {
    const { userEmail } = req.query;
    const query = userEmail ? { userEmail } : {};
    const appointments = await Appointment.find(query);
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch appointments" });
  }
});

// Delete an appointment (move to removed collection)
app.delete("/appointments/:id", async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (appointment) {
      await new RemovedAppointment(appointment.toObject()).save();
      await Appointment.findByIdAndDelete(req.params.id);
      res.json({ message: "Appointment removed and stored for verification." });
    } else {
      res.status(404).json({ error: "Appointment not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete appointment" });
  }
});

// =======================
// Booking Routes (From server1.js)
// =======================

// Booking Schema
const bookingSchema = new mongoose.Schema({
  tripType: String,
  currentLocation: String,
  destination: String,
  date: String,
  time: String,
  numberOfMembers: String,
  selectedCar: String
});

const Booking = mongoose.model("Booking", bookingSchema);

// Book a trip
app.post("/api/bookings", async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    await newBooking.save();
    res.status(201).json({ message: "Booking saved successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error saving booking", error });
  }
});

// =======================
// Serve uploaded files
// =======================
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// =======================
// Start Server
// =======================
const PORT = 8000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
