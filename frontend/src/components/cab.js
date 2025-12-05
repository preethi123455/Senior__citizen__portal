import React from "react";
import { useNavigate } from 'react-router-dom';

function cab() {
    const navigate = useNavigate();

    return (
      <div style={{ fontFamily: 'Arial, sans-serif' }}>
        {/* Navbar */}
        <div style={{ background: '#6A0DAD', padding: '10px 20px', display: 'flex', justifyContent: 'space-between', color: 'white' }}>
          <h2>SeniorEase</h2>
          <div>
            <button style={{ marginRight: '10px', background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}>Home</button>
            <button style={{ marginRight: '10px', background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}>Services</button>
            <button style={{ marginRight: '10px', background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}>About</button>
            <button style={{ marginRight: '10px', background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}>Contact</button>
            <button style={{ background: '#ffffff', color: '#6A0DAD', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}>Login</button>
          </div>
        </div>
        
        {/* Booking Section */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
          <div style={{ width: '50%', padding: '20px', boxShadow: '0px 0px 10px #ccc', borderRadius: '10px' }}>
            <h3>Book Your Ride</h3>
            <input type="text" placeholder="Enter your current location" style={{ width: '100%', padding: '8px', margin: '10px 0' }} />
            <input type="text" placeholder="Enter destination address" style={{ width: '100%', padding: '8px', margin: '10px 0' }} />
            <input type="date" style={{ width: '100%', padding: '8px', margin: '10px 0' }} />
            <input type="time" style={{ width: '100%', padding: '8px', margin: '10px 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0' }}>
              <div style={{ border: '1px solid #6A0DAD', padding: '10px', borderRadius: '5px', cursor: 'pointer' }}>Standard Sedan ₹150</div>
              <div style={{ border: '1px solid #6A0DAD', padding: '10px', borderRadius: '5px', cursor: 'pointer' }}>Premium SUV ₹250</div>
              <div style={{ border: '1px solid #6A0DAD', padding: '10px', borderRadius: '5px', cursor: 'pointer' }}>Luxury Vehicle ₹350</div>
            </div>
            <button style={{ width: '100%', background: '#6A0DAD', color: 'white', padding: '10px', borderRadius: '5px', cursor: 'pointer' }}>Book Now</button>
          </div>
        </div>
  
        {/* Side Panels */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <div style={{ width: '25%', padding: '10px' }}>
            <h3>Senior Benefits</h3>
            <p>✔ Voice Assistance</p>
            <p>✔ Medical Transport</p>
            <p>✔ Safety First</p>
            <p>✔ Flexible Scheduling</p>
          </div>
          <div style={{ width: '25%', padding: '10px' }}>
            <h3>Live Tracking</h3>
            <p>Estimated arrival: 12 minutes</p>
            <p>Distance: 2.3 miles</p>
          </div>
          <div style={{ width: '25%', padding: '10px' }}>
            <h3>Need Help?</h3>
            <button style={{ width: '100%', background: '#6A0DAD', color: 'white', padding: '10px', borderRadius: '5px', cursor: 'pointer', marginBottom: '5px' }}>Call Support</button>
            <button style={{ width: '100%', background: '#6A0DAD', color: 'white', padding: '10px', borderRadius: '5px', cursor: 'pointer' }}>Chat with Us</button>
          </div>
        </div>
  
        {/* Footer */}
        <div style={{ background: '#6A0DAD', color: 'white', textAlign: 'center', padding: '10px', marginTop: '20px' }}>
          <p>SeniorEase | Safe and comfortable transportation for seniors</p>
        </div>
      </div>
    );
  }
  
  export default cab;
  