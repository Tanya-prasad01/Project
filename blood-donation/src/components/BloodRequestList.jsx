// import React, { useState, useEffect } from 'react';
// import axiosInstance from '../api/axios';
// import { Link } from 'react-router-dom';
// import './BloodRequestList.css';

// const BloodRequestList = () => {
//   const [requests, setRequests] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
  
//   useEffect(() => {
//     const fetchRequests = async () => {
//       try {
//         const response = await axiosInstance.get('/blood/requests');
//         setRequests(response.data);
//         setLoading(false);
//       } catch (err) {
//         console.error('Error fetching blood requests:', err);
//         setError('Failed to load blood requests');
//         setLoading(false);
//       }
//     };
    
//     fetchRequests();
//   }, []);
  
//   const getUrgencyClass = (urgency) => {
//     switch(urgency) {
//       case 'Emergency':
//         return 'emergency';
//       case 'Urgent':
//         return 'urgent';
//       default:
//         return 'standard';
//     }
//   };
  
//   const formatDate = (dateString) => {
//     const options = { 
//       year: 'numeric', 
//       month: 'short', 
//       day: 'numeric', 
//       hour: '2-digit', 
//       minute: '2-digit' 
//     };
//     return new Date(dateString).toLocaleDateString('en-US', options);
//   };
  
//   if (loading) {
//     return <div className="loading">Loading blood requests...</div>;
//   }
  
//   if (error) {
//     return <div className="error-message">{error}</div>;
//   }
  
//   if (requests.length === 0) {
//     return (
//       <div className="no-requests">
//         <p>No blood requests available at the moment.</p>
//         <Link to="/emergency-request" className="create-request-btn">
//           Create New Request
//         </Link>
//       </div>
//     );
//   }
  
//   return (
//     <div className="blood-requests-container">
//       <div className="requests-header">
//         <h2>Blood Requests</h2>
//         <Link to="/emergency-request" className="create-request-btn">
//           Create New Request
//         </Link>
//       </div>
      
//       <div className="blood-requests-list">
//         {requests.map(request => (
//           <div key={request._id} className="request-card">
//             <div className={`urgency-tag ${getUrgencyClass(request.urgency)}`}>
//               {request.urgency}
//             </div>
            
//             <div className="request-details">
//               <h3>{request.patientName}</h3>
//               <div className="blood-group-badge">{request.bloodGroup}</div>
//               <p><strong>Units:</strong> {request.units}</p>
//               <p><strong>Hospital:</strong> {request.hospital}</p>
//               <p><strong>Location:</strong> {request.location}</p>
//               <p><strong>Status:</strong> <span className={`status-${request.status.toLowerCase()}`}>{request.status}</span></p>
//               <p><strong>Posted:</strong> {formatDate(request.createdAt)}</p>
//             </div>
            
//             <div className="request-actions">
//               <a href={`tel:${request.contactPhone}`} className="contact-btn">
//                 Contact ({request.contactPhone})
//               </a>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default BloodRequestList;




//new code
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './BloodRequestList.css';

const BloodRequestList = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/emergency/request');
        setRequests(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching blood requests:', err);
        setError('Failed to load blood requests');
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const getUrgencyClass = (urgency) => {
    if (urgency === 'Emergency' || urgency === true) return 'emergency';
    if (urgency === 'Urgent') return 'urgent';
    return 'standard';
  };

  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  if (loading) {
    return <div className="loading">Loading blood requests...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (requests.length === 0) {
    return (
      <div className="no-requests">
        <p>No blood requests available at the moment.</p>
        <Link to="/emergency-request" className="create-request-btn">
          Create New Request
        </Link>
      </div>
    );
  }

  return (
    <div className="blood-requests-container">
      <div className="requests-header">
        <h2>Blood Requests</h2>
        <Link to="/emergency-request" className="create-request-btn">
          Create New Request
        </Link>
      </div>

      <div className="blood-requests-list">
        {requests.map(request => (
          <div key={request._id} className="request-card">
            <div className={`urgency-tag ${getUrgencyClass(request.isUrgent)}`}>
              {request.isUrgent ? 'Emergency' : 'Standard'}
            </div>

            <div className="request-details">
              <h3>{request.name || request.patientName}</h3>
              <div className="blood-group-badge">{request.bloodGroup}</div>
              <p><strong>Units:</strong> {request.units}</p>
              <p><strong>Hospital:</strong> {request.hospital}</p>
              <p><strong>Location:</strong> {request.location}</p>
              <p><strong>Message:</strong> {request.message || '-'}</p>
              <p><strong>Posted:</strong> {formatDate(request.createdAt)}</p>
            </div>

            <div className="request-actions">
              <a href={`tel:${request.phone || request.contactPhone}`} className="contact-btn">
                Contact ({request.phone || request.contactPhone})
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BloodRequestList;
