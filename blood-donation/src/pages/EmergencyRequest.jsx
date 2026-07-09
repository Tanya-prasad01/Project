// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axiosInstance from '../api/axios';
// import './EmergencyRequest.css';

// const EmergencyRequest = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     patientName: '',
//     bloodGroup: '',
//     units: 1,
//     hospital: '',
//     location: '',
//     contactPhone: '',
//     urgency: 'Emergency'
//   });
  
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState(null);
  
//   const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };
  
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setIsLoading(true);
    
//     try {
//       const response = await axiosInstance.post('/blood/emergency-request', formData);
//       setSuccess(response.data);
//       setIsLoading(false);
      
//       // Automatically redirect after 5 seconds
//       setTimeout(() => {
//         navigate('/dashboard');
//       }, 5000);
//     } catch (error) {
//       console.error('Error submitting request:', error);
//       setError(error.response?.data?.message || 'Failed to submit request. Please try again.');
//       setIsLoading(false);
//     }
//   };
  
//   return (
//     <div className="emergency-request-container">
//       <div className="emergency-request-header">
//         <h1>Emergency Blood Request</h1>
//         <p className="emergency-subtitle">Submit an urgent request to notify compatible donors</p>
//       </div>
      
//       {success ? (
//         <div className="request-success">
//           <div className="success-icon">✓</div>
//           <h2>Request Submitted Successfully!</h2>
//           <p>Your emergency blood request has been created.</p>
//           <p><strong>{success.notifiedDonors}</strong> compatible donors have been notified.</p>
//           <p>You will be redirected to the dashboard in a few seconds...</p>
//           <button 
//             className="dashboard-button"
//             onClick={() => navigate('/dashboard')}
//           >
//             Go to Dashboard
//           </button>
//         </div>
//       ) : (
//         <form onSubmit={handleSubmit} className="emergency-form">
//           <div className="form-group">
//             <label>Patient Name</label>
//             <input
//               type="text"
//               name="patientName"
//               value={formData.patientName}
//               onChange={handleChange}
//               placeholder="Enter patient's name"
//               required
//             />
//           </div>
          
//           <div className="form-row">
//             <div className="form-group">
//               <label>Blood Group</label>
//               <select
//                 name="bloodGroup"
//                 value={formData.bloodGroup}
//                 onChange={handleChange}
//                 required
//               >
//                 <option value="">Select blood group</option>
//                 {bloodGroups.map(group => (
//                   <option key={group} value={group}>{group}</option>
//                 ))}
//               </select>
//             </div>
            
//             <div className="form-group">
//               <label>Units Required</label>
//               <input
//                 type="number"
//                 name="units"
//                 value={formData.units}
//                 onChange={handleChange}
//                 min="1"
//                 max="10"
//                 required
//               />
//             </div>
//           </div>
          
//           <div className="form-group">
//             <label>Hospital</label>
//             <input
//               type="text"
//               name="hospital"
//               value={formData.hospital}
//               onChange={handleChange}
//               placeholder="Hospital name"
//               required
//             />
//           </div>
          
//           <div className="form-group">
//             <label>Location</label>
//             <input
//               type="text"
//               name="location"
//               value={formData.location}
//               onChange={handleChange}
//               placeholder="City or area"
//               required
//             />
//           </div>
          
//           <div className="form-group">
//             <label>Contact Phone Number</label>
//             <input
//               type="tel"
//               name="contactPhone"
//               value={formData.contactPhone}
//               onChange={handleChange}
//               placeholder="Phone number for donors to contact"
//               required
//             />
//           </div>
          
//           <div className="form-group">
//             <label>Urgency Level</label>
//             <select
//               name="urgency"
//               value={formData.urgency}
//               onChange={handleChange}
//               required
//             >
//               <option value="Emergency">Emergency (Immediate)</option>
//               <option value="Urgent">Urgent (Within 24 hours)</option>
//               <option value="Standard">Standard (1-3 days)</option>
//             </select>
//           </div>
          
//           {error && <div className="error-message">{error}</div>}
          
//           <button 
//             type="submit" 
//             className="emergency-submit-btn"
//             disabled={isLoading}
//           >
//             {isLoading ? 'Submitting...' : 'Send Emergency Request'}
//           </button>
//         </form>
//       )}
//     </div>
//   );
// };

// export default EmergencyRequest;

