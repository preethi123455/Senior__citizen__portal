import React, { useState } from 'react';
import axios from 'axios';
import { Upload } from 'lucide-react';

function DoctorVerification() {
  const [formData, setFormData] = useState({
    fullName: '',
    licenseNumber: '',
    experience: '',
    specialization: '',
    document: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prevData => ({
      ...prevData,
      document: e.target.files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('fullName', formData.fullName);
    data.append('licenseNumber', formData.licenseNumber);
    data.append('experience', formData.experience);
    data.append('specialization', formData.specialization);
    data.append('document', formData.document);

    try {
      const response = await axios.post('http://localhost:8000/verify-doctor', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      console.log(response.data);
      alert('Doctor verification submitted successfully');
    } catch (error) {
      console.error(error);
      alert('Submission failed');
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f9f6ff', color: '#4c1d95', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ maxWidth: '600px', width: '100%', backgroundColor: 'white', padding: '32px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '16px', textAlign: 'center' }}>Doctor Verification</h1>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }} encType="multipart/form-data">
          <label style={{ marginBottom: '8px', fontWeight: '600' }}>Full Name</label>
          <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ccc', marginBottom: '16px' }} required />
          
          <label style={{ marginBottom: '8px', fontWeight: '600' }}>Medical License Number</label>
          <input type="text" name="licenseNumber" value={formData.licenseNumber} onChange={handleChange} style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ccc', marginBottom: '16px' }} required />
          
          <label style={{ marginBottom: '8px', fontWeight: '600' }}>Years of Experience</label>
          <input type="number" name="experience" value={formData.experience} onChange={handleChange} style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ccc', marginBottom: '16px' }} min="0" required />
          
          <label style={{ marginBottom: '8px', fontWeight: '600' }}>Specialization</label>
          <select name="specialization" value={formData.specialization} onChange={handleChange} style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ccc', marginBottom: '16px' }} required>
            <option value="">Select Specialization</option>
            <option value="cardiology">Cardiology</option>
            <option value="neurology">Neurology</option>
            <option value="pediatrics">Pediatrics</option>
            <option value="general">General Medicine</option>
          </select>
          
          <label style={{ marginBottom: '8px', fontWeight: '600' }}>Upload Documents</label>
          <div style={{ border: '2px dashed #ccc', padding: '16px', borderRadius: '8px', textAlign: 'center', marginBottom: '16px' }}>
            <Upload style={{ color: '#4c1d95', marginBottom: '8px' }} size={32} />
            <input type="file" accept=".pdf,.jpg,.jpeg,.png,.doc" onChange={handleFileChange} required />
          </div>
          
          <button type="submit" style={{ backgroundColor: '#4c1d95', color: 'white', fontWeight: 'bold', padding: '12px', borderRadius: '8px', cursor: 'pointer', transition: '0.3s' }}
            onMouseOver={(e) => e.target.style.opacity = '0.8'}
            onMouseOut={(e) => e.target.style.opacity = '1'}>
            Submit for Verification
          </button>
        </form>
      </div>
    </div>
  );
}

export default DoctorVerification;
