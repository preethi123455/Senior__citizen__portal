import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const doctors = [
  { name: 'Ms Preethi', Language: 'Tamil' },
  { name: 'Mr Pranav', Language: 'English' },
  { name: 'Mr Praneesh', Language: 'Tamil' },
  { name: 'Ms Prateeksha', Language: 'Hindi' },
];

function Consultation() {
  const navigate = useNavigate();
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [availableDoctors, setAvailableDoctors] = useState(doctors);
  
  useEffect(() => {
    const storedAppointments = JSON.parse(localStorage.getItem('appointments')) || [];
    setAppointments(storedAppointments);
  }, []);

  useEffect(() => {
    if (appointmentDate && appointmentTime) {
      const randomAvailability = doctors.map(doctor => ({
        ...doctor,
        available: Math.random() > 0.5,
      }));
      setAvailableDoctors(randomAvailability);
    }
  }, [appointmentDate, appointmentTime]);

  const generateJitsiMeetLink = (roomName) => {
    return `https://meet.jit.si/${roomName}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedDoctor) {
      alert('Please select an available Volunteer.');
      return;
    }
    const roomName = `${selectedDoctor.replace(/\s/g, '')}-${Date.now()}`;
    const meetLink = generateJitsiMeetLink(roomName);
    const newAppointment = { selectedDoctor, appointmentDate, appointmentTime, meetLink };
    const updatedAppointments = [...appointments, newAppointment];
    setAppointments(updatedAppointments);
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
    alert('Appointment booked successfully!');
  };

  const handleDeleteAppointment = (index) => {
    const updatedAppointments = appointments.filter((_, i) => i !== index);
    setAppointments(updatedAppointments);
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
  };

  const handleJoinCall = (appointment, asModerator) => {
    if (asModerator) {
      const enteredPin = prompt('Enter Volunteer Security PIN:');
      if (enteredPin !== '1234') {
        alert('Incorrect PIN. Access Denied.');
        return;
      }
    }
    window.open(appointment.meetLink, '_blank');
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '32px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ fontSize: '28px', fontWeight: 'bold', textAlign: 'center', marginBottom: '16px' }}>NGO Consultation</h1>
      <p style={{ textAlign: 'center', color: '#6b7280', marginBottom: '24px' }}>Enter date & time first to check Volunteer availability.</p>

      <form onSubmit={handleSubmit} style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
        <h2 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '16px' }}>Book an Appointment</h2>

        <input type="date" value={appointmentDate} onChange={(e) => setAppointmentDate(e.target.value)} style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '8px', marginBottom: '12px' }} required />
        <input type="time" value={appointmentTime} onChange={(e) => setAppointmentTime(e.target.value)} style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '8px', marginBottom: '16px' }} required />

        <select value={selectedDoctor} onChange={(e) => {
          const doctor = availableDoctors.find(d => d.name === e.target.value);
          if (doctor?.available) {
            setSelectedDoctor(e.target.value);
          } else {
            alert('Volunteer is unavailable at the selected time. Please choose another.');
            setSelectedDoctor('');
          }
        }} style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '8px', marginBottom: '16px' }} required>
          <option value="">Select a Volunteer</option>
          {availableDoctors.map((doctor) => (
            <option key={doctor.name} value={doctor.name} disabled={!doctor.available}>
              {doctor.name} - {doctor.Language} {doctor.available ? "(Available)" : "(Not Available)"}
            </option>
          ))}
        </select>

        <button type="submit" style={{ width: '100%', backgroundColor: '#4c1d95', color: 'white', padding: '12px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', transition: '0.3s' }}>
          Book Appointment
        </button>
      </form>

      <div style={{ marginTop: '32px' }}>
        <h2 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '16px' }}>Scheduled Appointments</h2>
        {appointments.length === 0 ? (
          <p>No appointments scheduled.</p>
        ) : (
          <ul style={{ listStyleType: 'none', padding: '0' }}>
            {appointments.map((appointment, index) => (
              <li key={index} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
                <div>
                  <strong>Volunteer:</strong> {appointment.selectedDoctor} |
                  <strong> Date:</strong> {appointment.appointmentDate} |
                  <strong> Time:</strong> {appointment.appointmentTime}
                </div>
                <div>
                  <button onClick={() => handleJoinCall(appointment, false)} style={{ backgroundColor: 'green', color: 'white', padding: '6px 12px', borderRadius: '6px', marginRight: '6px', cursor: 'pointer' }}>Join as User</button>
                  <button onClick={() => handleJoinCall(appointment, true)} style={{ backgroundColor: 'red', color: 'white', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer' }}>Join as Volunteer</button>
                  <button onClick={() => handleDeleteAppointment(index)} style={{ backgroundColor: 'gray', color: 'white', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer' }}>Delete</button>
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