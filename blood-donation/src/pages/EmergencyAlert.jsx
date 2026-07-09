
// // EmergencyAlert.js
// import React, { useState } from 'react';
// import axios from 'axios';

// const EmergencyAlert = () => {
//   const [bloodGroup, setBloodGroup] = useState('');
//   const [location, setLocation] = useState('');
//   const [message, setMessage] = useState('');

//   const handleSendAlert = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem('token'); // or wherever your auth token is stored

//     try {
//       const res = await axios.post(
//         'http://localhost:5000/api/alert/emergency',
//         { bloodGroup, location, message },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       alert(res.data.message);
//     } catch (error) {
//       console.error('❌ Emergency alert error:', error.response?.data?.message || error.message);
//       alert('Failed to send alert');
//     }
//   };

//   return (
//     <form onSubmit={handleSendAlert}>
//       <h3>Send Emergency Alert</h3>
//       <input
//         type="text"
//         placeholder="Blood Group (e.g., A+)"
//         value={bloodGroup}
//         onChange={(e) => setBloodGroup(e.target.value)}
//         required
//       />
//       <input
//         type="text"
//         placeholder="Location"
//         value={location}
//         onChange={(e) => setLocation(e.target.value)}
//         required
//       />
//       <textarea
//         placeholder="Message (optional)"
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//       />
//       <button type="submit">🚨 Send Alert</button>
//     </form>
//   );
// };

// export default EmergencyAlert;












import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axios';
import './EmergencyAlert.css';

const EmergencyAlert = () => {
  const [bloodGroup, setBloodGroup] = useState('');
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState('');
  const [urgentRequests, setUrgentRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Send alert handler
  const handleSendAlert = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const res = await axiosInstance.post(
        '/alert/emergency',
        { bloodGroup, location, message },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(res.data.message);
      setBloodGroup('');
      setLocation('');
      setMessage('');
    } catch (error) {
      console.error('❌ Emergency alert error:', error.response?.data?.message || error.message);
      alert('Failed to send alert');
    }
  };

  // Fetch urgent requests
  useEffect(() => {
    const fetchUrgentRequests = async () => {
      try {
        const response = await axiosInstance.get('/blood/requests');
        const filtered = response.data.filter(req => req.isUrgent === true);
        setUrgentRequests(filtered);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch emergency alerts:', err);
        setError('Could not load emergency alerts');
        setLoading(false);
      }
    };

    fetchUrgentRequests();
  }, []);

  return (
    <div className="emergency-alert-page">
      <form onSubmit={handleSendAlert} className="alert-form">
        <h3>🚨 Send Emergency Alert</h3>
        <input
          type="text"
          placeholder="Blood Group (e.g., A+)"
          value={bloodGroup}
          onChange={(e) => setBloodGroup(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <textarea
          placeholder="Message (optional)"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Send Alert</button>
      </form>

      <div className="urgent-requests-list">
        <h3>🩸 Urgent Blood Requests</h3>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : urgentRequests.length === 0 ? (
          <p>No urgent requests right now.</p>
        ) : (
          urgentRequests.map((request) => (
            <div key={request._id} className="request-card">
              <h4>{request.patientName} - {request.bloodGroup}</h4>
              <p><strong>Units:</strong> {request.units}</p>
              <p><strong>Hospital:</strong> {request.hospital}</p>
              <p><strong>Location:</strong> {request.location}</p>
              <p><strong>Message:</strong> {request.message}</p>
              <p><strong>Contact:</strong> <a href={`tel:${request.phone}`}>{request.phone}</a></p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default EmergencyAlert;
