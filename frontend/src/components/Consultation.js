import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Consultation() {
  const navigate = useNavigate();
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [availableDoctors, setAvailableDoctors] = useState([]);
  const userEmail = localStorage.getItem('userEmail');

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const [doctorsResponse, appointmentsResponse] = await Promise.all([
          axios.get("http://localhost:8000/doctors"),
          axios.get("http://localhost:8000/appointments"),
        ]);
    
        const bookedDoctors = new Set(appointmentsResponse.data.map(appointment => appointment.selectedDoctor));
        const availableDoctors = doctorsResponse.data.filter(doctor => !bookedDoctors.has(doctor.fullName));
    
        setAvailableDoctors(availableDoctors);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };
    

    const fetchAppointments = async () => {
      try {
        const response = await axios.get("http://localhost:8000/appointments", { params: { userEmail } });
        setAppointments(response.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchDoctors();
    fetchAppointments();
  }, [userEmail]);

  const generateJitsiMeetLink = (roomName) => {
    return `https://meet.jit.si/${roomName}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedDoctor || !userEmail) {
      alert('Please select a doctor and ensure you are logged in.');
      return;
    }
  
    const roomName = `${selectedDoctor.replace(/\s/g, '')}-${Date.now()}`;
    const meetLink = generateJitsiMeetLink(roomName);
    const newAppointment = { selectedDoctor, appointmentDate, appointmentTime, meetLink, userEmail };
  
    try {
      const response = await axios.post("http://localhost:8000/appointments", newAppointment);
      setAppointments([...appointments, response.data]);
      alert('Appointment booked successfully!');
    } catch (error) {
      if (error.response && error.response.data.error) {
        alert(error.response.data.error); // Show error message if doctor is already booked
      } else {
        console.error("Error booking appointment:", error);
      }
    }
  };
  
  const handleDelete = async (appointmentId) => {
    try {
      await axios.delete(`http://localhost:8000/appointments/${appointmentId}`);
      setAppointments(appointments.filter(app => app._id !== appointmentId));
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  };

  const handleJoinCall = (appointment, asModerator) => {
    if (asModerator) {
      const enteredPin = prompt('Enter Moderator Security PIN:');
      if (enteredPin !== '1234') {
        alert('Incorrect PIN. Access Denied.');
        return;
      }
    }
    window.open(appointment.meetLink, '_blank');
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '32px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f3e5f5', color: '#4a148c', borderRadius: '12px' }}>
      <h1 style={{ fontSize: '28px', fontWeight: 'bold', textAlign: 'center', marginBottom: '16px' }}>Doctor Consultation</h1>

      <form onSubmit={handleSubmit} style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
        <h2 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '16px', color: '#6a1b9a' }}>Book an Appointment</h2>
        <input type="date" value={appointmentDate} onChange={(e) => setAppointmentDate(e.target.value)} required style={{ width: '100%', marginBottom: '10px', padding: '8px', borderRadius: '6px', border: '1px solid #6a1b9a' }} />
        <input type="time" value={appointmentTime} onChange={(e) => setAppointmentTime(e.target.value)} required style={{ width: '100%', marginBottom: '10px', padding: '8px', borderRadius: '6px', border: '1px solid #6a1b9a' }} />
        <select value={selectedDoctor} onChange={(e) => setSelectedDoctor(e.target.value)} required style={{ width: '100%', marginBottom: '10px', padding: '8px', borderRadius: '6px', border: '1px solid #6a1b9a' }}>
          <option value="">Select a Doctor</option>
          {availableDoctors.map((doctor) => (
            <option key={doctor._id} value={doctor.fullName}>
              Dr. {doctor.fullName} - {doctor.specialization}
            </option>
          ))}
        </select>
        <button type="submit" style={{ backgroundColor: '#6a1b9a', color: 'white', padding: '10px', borderRadius: '6px', border: 'none', cursor: 'pointer' }}>Book Appointment</button>
      </form>

      <div style={{ marginTop: '32px' }}>
        <h2 style={{ color: '#6a1b9a' }}>Scheduled Appointments</h2>
        {appointments.length === 0 ? (
          <p>No appointments scheduled.</p>
        ) : (
          <ul>
            {appointments.map((appointment) => (
              <li key={appointment._id} style={{ backgroundColor: 'white', padding: '12px', borderRadius: '8px', marginBottom: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                <strong>Doctor:</strong> {appointment.selectedDoctor} |
                <strong> Date:</strong> {appointment.appointmentDate} |
                <strong> Time:</strong> {appointment.appointmentTime}
                <div style={{ marginTop: '8px' }}>
                  <button onClick={() => handleJoinCall(appointment, false)} style={{ backgroundColor: '#8e24aa', color: 'white', padding: '8px', borderRadius: '6px', border: 'none', marginRight: '8px', cursor: 'pointer' }}>Join as Patient</button>
                  <button onClick={() => handleJoinCall(appointment, true)} style={{ backgroundColor: '#ab47bc', color: 'white', padding: '8px', borderRadius: '6px', border: 'none', marginRight: '8px', cursor: 'pointer' }}>Join as Moderator</button>
                  <button onClick={() => handleDelete(appointment._id)} style={{ backgroundColor: '#d81b60', color: 'white', padding: '8px', borderRadius: '6px', border: 'none', cursor: 'pointer' }}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Consultation;
