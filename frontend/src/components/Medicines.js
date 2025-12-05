import React, { useState } from "react";
import { FaMicrophone, FaCarSide } from 'react-icons/fa';
import "./Medicines.css";
import { useNavigate } from 'react-router-dom';

const carOptions = [
  { type: "SUV", image: "https://img.freepik.com/premium-photo/generic-black-suv_2227-851.jpg", basePrice: 200, capacity: 7 },
  { type: "Sedan", image: "https://img.freepik.com/premium-photo/car-body-parts-side-view-automotive-car-parts_258335-1771.jpg", basePrice: 150, capacity: 4 },
  { type: "Hatchback", image: "https://img.freepik.com/premium-photo/car-parked-white_10541-709.jpg", basePrice: 120, capacity: 4 },
  { type: "Supercar", image: "https://img.freepik.com/free-photo/mini-coupe-driving-highway-accross-mountains_114579-4015.jpg", basePrice: 100, capacity: 2 },
];

function Medicines() {
  const [tripType, setTripType] = useState("one-way");
  const [currentLocation, setCurrentLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [numberOfMembers, setNumberOfMembers] = useState("");
  const [selectedCar, setSelectedCar] = useState(null);
      const navigate = useNavigate();

  const handleBooking = async () => {
    if (!currentLocation || !destination || !date || !time || !numberOfMembers || !selectedCar) {
      alert("Please fill in all fields and select a car.");
      return;
    }
    
    const bookingDetails = { tripType, currentLocation, destination, date, time, numberOfMembers, selectedCar };
    
    try {
      const response = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingDetails),
      });
      
      const result = await response.json();
      if (response.ok) {
        alert("Booking successful!");
      } else {
        alert("Error: " + result.message);
      }
    } catch (error) {
      console.error("Error booking car:", error);
      alert("Failed to book the car.");
    }
  };

  return (
    <div className="medicines-container">
      
      <div className="medicines-header">
        <FaCarSide style={{ marginRight: 10 }} /> SeniorEase
      </div>
      <div className="medicines-form">
        <input type="text" value={currentLocation} onChange={(e) => setCurrentLocation(e.target.value)} placeholder="Enter your location" />
        <input type="text" value={destination} onChange={(e) => setDestination(e.target.value)} placeholder="Enter destination" />
        <input type="number" value={numberOfMembers} onChange={(e) => setNumberOfMembers(e.target.value)} placeholder="Number of members" />
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
      </div>
      <div className="medicines-car-section">
        <h2>Select Your Car</h2>
        <div className="medicines-car-container">
          {carOptions.map((car) => (
            <div key={car.type} className={`medicines-car-card ${selectedCar === car.type ? "selected" : ""}`} onClick={() => setSelectedCar(car.type)}>
              <img src={car.image} alt={car.type} className="medicines-car-image" />
              <h4>{car.type}</h4>
              <button onClick={handleBooking}>Book Now</button>
              
            </div>
          ))}
        </div>
      </div>
      <button onClick={() => navigate("/home")}>Back</button>
    </div>
  );
}

export default Medicines;
