const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/seniorEaseBookings", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Define Schema
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

// API to handle bookings
app.post("/api/bookings", async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    await newBooking.save();
    res.status(201).json({ message: "Booking saved successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error saving booking", error });
  }
});

// Start server
const PORT = 9000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));