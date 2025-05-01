import React, { useState } from 'react';
import axios from 'axios';
import './Request.css'; 
// import { useNavigate } from "react-router-dom";

const RequestBlood = () => {
  const [formData, setFormData] = useState({
    name: '',
    bloodGroup: '',
    quantity: '',
    contact: '',
    hospital: '',
    location: '',
    reason: '',
    isUrgent: false
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/blood/request', formData);
      if (response.status === 200) {
        setMessage(formData.isUrgent ? '⚠️ Urgent blood request submitted!' : 'Blood request submitted successfully.');
        setFormData({
          name: '',
          bloodGroup: '',
          quantity: '',
          contact: '',
          hospital: '',
          location: '',
          reason: '',
          isUrgent: false
        });
      } else {
        setMessage('Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Request error:', error);
      setMessage('Error sending request. Please check your connection or try again later.');
    }
  };

  return (
    <div className="form-container">
      <h2>Request Blood</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
        
        <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} required>
          <option value="">Select Blood Group</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
        </select>

        <input type="number" name="quantity" placeholder="Quantity (in units)" value={formData.quantity} onChange={handleChange} required />
        <input type="text" name="contact" placeholder="Contact Info" value={formData.contact} onChange={handleChange} required />
        <input type="text" name="hospital" placeholder="Hospital Name/Address" value={formData.hospital} onChange={handleChange} required />
        <input type="text" name="location" placeholder="City or Area" value={formData.location} onChange={handleChange} required />
        <textarea name="reason" placeholder="Reason for Request" value={formData.reason} onChange={handleChange} required />

        <div className="urgent-checkbox">
          <input type="checkbox" name="isUrgent" checked={formData.isUrgent} onChange={handleChange} />
          <label htmlFor="isUrgent">Mark as Urgent</label>
        </div>

        <button type="submit">Submit Request</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default RequestBlood;
