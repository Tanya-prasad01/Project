// // // src/pages/Profile.jsx
// // import React, { useState, useEffect } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import './Profile.css';

// // const Profile = () => {
// //   const navigate = useNavigate();
// //   const [user, setUser] = useState(null);
// //   const [donations, setDonations] = useState([]);
// //   const [requests, setRequests] = useState([]);
// //   const [isEditing, setIsEditing] = useState(false);
// //   const [formData, setFormData] = useState({
// //     name: '',
// //     email: '',
// //     phone: '',
// //     bloodGroup: '',
// //     location: ''
// //   });

// //   useEffect(() => {
// //     // Get user data from localStorage
// //     const userData = JSON.parse(localStorage.getItem('userData'));
    
// //     if (!userData) {
// //       navigate('/login');
// //       return;
// //     }
    
// //     setUser(userData);
// //     setFormData({
// //       name: userData.name || '',
// //       email: userData.email || '',
// //       phone: userData.phone || '',
// //       bloodGroup: userData.bloodGroup || '',
// //       location: userData.location || ''
// //     });

// //     // Load donations and requests from localStorage for now
// //     // In a real app, you would fetch these from your backend
// //     const storedDonations = JSON.parse(localStorage.getItem('donors')) || [];
// //     const userDonations = storedDonations.filter(donation => 
// //       donation.name.toLowerCase() === userData.name?.toLowerCase()
// //     );
// //     setDonations(userDonations);
    
// //     // For demonstration, we'll create some mock requests
// //     // In a real application, these would come from your backend
// //     setRequests([]);
// //   }, [navigate]);

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData({
// //       ...formData,
// //       [name]: value
// //     });
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
    
// //     // Update user in localStorage
// //     const updatedUser = { ...user, ...formData };
// //     localStorage.setItem('userData', JSON.stringify(updatedUser));
// //     setUser(updatedUser);
// //     setIsEditing(false);
    
// //     // In a real application, you would also update the user in your backend
// //     alert('Profile updated successfully!');
// //   };

// //   if (!user) {
// //     return <div className="profile-container">Loading...</div>;
// //   }

// //   return (
// //     <div className="profile-container">
// //       <div className="profile-header">
// //         <h1>User Profile</h1>
// //         {!isEditing && (
// //           <button className="edit-button" onClick={() => setIsEditing(true)}>
// //             Edit Profile
// //           </button>
// //         )}
// //       </div>

// //       {isEditing ? (
// //         <div className="profile-edit">
// //           <form onSubmit={handleSubmit}>
// //             <div className="form-group">
// //               <label>Name</label>
// //               <input 
// //                 type="text" 
// //                 name="name" 
// //                 value={formData.name} 
// //                 onChange={handleChange}
// //                 required
// //               />
// //             </div>
            
// //             <div className="form-group">
// //               <label>Email</label>
// //               <input 
// //                 type="email" 
// //                 name="email" 
// //                 value={formData.email} 
// //                 onChange={handleChange}
// //                 required
// //                 disabled
// //               />
// //             </div>
            
// //             <div className="form-group">
// //               <label>Phone</label>
// //               <input 
// //                 type="tel" 
// //                 name="phone" 
// //                 value={formData.phone} 
// //                 onChange={handleChange}
// //                 required
// //               />
// //             </div>
            
// //             <div className="form-group">
// //               <label>Blood Group</label>
// //               <select 
// //                 name="bloodGroup" 
// //                 value={formData.bloodGroup} 
// //                 onChange={handleChange}
// //                 required
// //               >
// //                 <option value="">Select Blood Group</option>
// //                 <option value="A+">A+</option>
// //                 <option value="A-">A-</option>
// //                 <option value="B+">B+</option>
// //                 <option value="B-">B-</option>
// //                 <option value="AB+">AB+</option>
// //                 <option value="AB-">AB-</option>
// //                 <option value="O+">O+</option>
// //                 <option value="O-">O-</option>
// //               </select>
// //             </div>
            
// //             <div className="form-group">
// //               <label>Location</label>
// //               <input 
// //                 type="text" 
// //                 name="location" 
// //                 value={formData.location} 
// //                 onChange={handleChange}
// //                 required
// //               />
// //             </div>
            
// //             <div className="form-buttons">
// //               <button type="submit" className="save-button">Save Changes</button>
// //               <button 
// //                 type="button" 
// //                 className="cancel-button" 
// //                 onClick={() => setIsEditing(false)}
// //               >
// //                 Cancel
// //               </button>
// //             </div>
// //           </form>
// //         </div>
// //       ) : (
// //         <div className="profile-info">
// //           <div className="info-group">
// //             <label>Name:</label>
// //             <p>{user.name}</p>
// //           </div>
          
// //           <div className="info-group">
// //             <label>Email:</label>
// //             <p>{user.email}</p>
// //           </div>
          
// //           <div className="info-group">
// //             <label>Phone:</label>
// //             <p>{user.phone || 'Not provided'}</p>
// //           </div>
          
// //           <div className="info-group">
// //             <label>Blood Group:</label>
// //             <p>{user.bloodGroup || 'Not provided'}</p>
// //           </div>
          
// //           <div className="info-group">
// //             <label>Location:</label>
// //             <p>{user.location || 'Not provided'}</p>
// //           </div>
          
// //           <div className="info-group">
// //             <label>Account Type:</label>
// //             <p>{user.role === 'donor' ? 'Blood Donor' : 'Blood Receiver'}</p>
// //           </div>
// //         </div>
// //       )}

// //       {user.role === 'donor' && (
// //         <div className="donation-history">
// //           <h2>Donation History</h2>
// //           {donations.length > 0 ? (
// //             <div className="history-list">
// //               {donations.map((donation, index) => (
// //                 <div key={index} className="history-item">
// //                   <p><strong>Date:</strong> {donation.date}</p>
// //                   <p><strong>Location:</strong> {donation.hospital || 'Not specified'}</p>
// //                 </div>
// //               ))}
// //             </div>
// //           ) : (
// //             <p>No donation history available.</p>
// //           )}
// //         </div>
// //       )}

// //       {user.role === 'receiver' && (
// //         <div className="request-history">
// //           <h2>Request History</h2>
// //           {requests.length > 0 ? (
// //             <div className="history-list">
// //               {requests.map((request, index) => (
// //                 <div key={index} className="history-item">
// //                   <p><strong>Date:</strong> {request.date}</p>
// //                   <p><strong>Blood Type:</strong> {request.bloodGroup}</p>
// //                   <p><strong>Status:</strong> {request.status}</p>
// //                 </div>
// //               ))}
// //             </div>
// //           ) : (
// //             <p>No request history available.</p>
// //           )}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default Profile;



// // src/pages/Profile.jsx
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Profile.css';

// const Profile = () => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);
//   const [donations, setDonations] = useState([]);
//   const [requests, setRequests] = useState([]);
//   const [isEditing, setIsEditing] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [formData, setFormData] = useState({
//     name: '',
//     phone: '',
//     location: '',
//     bloodGroup: ''
//   });

//   useEffect(() => {
//     // Get user data from localStorage
//     const userData = JSON.parse(localStorage.getItem('userData'));
    
//     if (!userData) {
//       navigate('/login');
//       return;
//     }
    
//     setUser(userData);
//     setFormData({
//       name: userData.name || '',
//       phone: userData.phone || '',
//       location: userData.location || '',
//       bloodGroup: userData.bloodGroup || ''
//     });

//     // In a real app, fetch from backend
//     // For now, let's use localStorage
//     const storedDonations = JSON.parse(localStorage.getItem('donors')) || [];
//     const myDonations = storedDonations.filter(d => 
//       d.name.toLowerCase() === userData.name?.toLowerCase()
//     );
//     setDonations(myDonations);

//     // Simulating API call completion
//     setLoading(false);
//   }, [navigate]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     // Update user in localStorage (in a real app, update in backend)
//     const updatedUser = { ...user, ...formData };
//     localStorage.setItem('userData', JSON.stringify(updatedUser));
//     setUser(updatedUser);
//     setIsEditing(false);
    
//     alert('Profile updated successfully!');
//   };

//   if (loading) {
//     return (
//       <div className="profile-loading">
//         <div className="spinner"></div>
//         <p>Loading profile...</p>
//       </div>
//     );
//   }

//   if (!user) {
//     return (
//       <div className="profile-error">
//         <p>Please log in to view your profile.</p>
//         <button onClick={() => navigate('/login')}>Go to Login</button>
//       </div>
//     );
//   }

//   return (
//     <div className="profile-container">
//       <div className="profile-header">
//         <h1>My Profile</h1>
//         {!isEditing ? (
//           <button className="edit-btn" onClick={() => setIsEditing(true)}>
//             Edit Profile
//           </button>
//         ) : null}
//       </div>

//       <div className="profile-content">
//         <div className="profile-card">
//           {isEditing ? (
//             // Edit Form
//             <form onSubmit={handleSubmit} className="edit-form">
//               <div className="form-group">
//                 <label>Full Name</label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               <div className="form-group">
//                 <label>Email</label>
//                 <input
//                   type="email"
//                   value={user.email}
//                   disabled
//                   className="disabled-input"
//                 />
//                 <small>Email cannot be changed</small>
//               </div>

//               <div className="form-group">
//                 <label>Phone Number</label>
//                 <input
//                   type="tel"
//                   name="phone"
//                   value={formData.phone}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               <div className="form-group">
//                 <label>Location</label>
//                 <input
//                   type="text"
//                   name="location"
//                   value={formData.location}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               <div className="form-group">
//                 <label>Blood Group</label>
//                 <select
//                   name="bloodGroup"
//                   value={formData.bloodGroup}
//                   onChange={handleChange}
//                   required
//                 >
//                   <option value="">Select Blood Group</option>
//                   <option value="A+">A+</option>
//                   <option value="A-">A-</option>
//                   <option value="B+">B+</option>
//                   <option value="B-">B-</option>
//                   <option value="AB+">AB+</option>
//                   <option value="AB-">AB-</option>
//                   <option value="O+">O+</option>
//                   <option value="O-">O-</option>
//                 </select>
//               </div>

//               <div className="form-actions">
//                 <button type="submit" className="save-btn">Save Changes</button>
//                 <button 
//                   type="button" 
//                   className="cancel-btn"
//                   onClick={() => setIsEditing(false)}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           ) : (
//             // Display Profile
//             <div className="profile-details">
//               <div className="profile-avatar">
//                 <div className="avatar-placeholder">
//                   {user.name?.charAt(0).toUpperCase() || 'U'}
//                 </div>
//                 <h2>{user.name}</h2>
//                 <span className="user-role">{user.role === 'donor' ? 'Blood Donor' : 'Blood Receiver'}</span>
//               </div>

//               <div className="user-info">
//                 <div className="info-item">
//                   <span className="info-label">Email:</span>
//                   <span className="info-value">{user.email}</span>
//                 </div>
                
//                 <div className="info-item">
//                   <span className="info-label">Phone:</span>
//                   <span className="info-value">{user.phone || 'Not provided'}</span>
//                 </div>
                
//                 <div className="info-item">
//                   <span className="info-label">Location:</span>
//                   <span className="info-value">{user.location || 'Not provided'}</span>
//                 </div>
                
//                 <div className="info-item">
//                   <span className="info-label">Blood Group:</span>
//                   <span className="info-value blood-type">{user.bloodGroup || 'Not provided'}</span>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Activity Section */}
//         <div className="activity-section">
//           {user.role === 'donor' && (
//             <div className="donation-history">
//               <h3>My Donation History</h3>
//               {donations.length > 0 ? (
//                 <div className="history-cards">
//                   {donations.map((donation, index) => (
//                     <div className="history-card" key={index}>
//                       <div className="card-header">
//                         <span className="donation-date">{new Date(donation.date).toLocaleDateString()}</span>
//                         <span className="donation-status">Completed</span>
//                       </div>
//                       <div className="card-body">
//                         <p><strong>Blood Type:</strong> {donation.bloodType}</p>
//                         <p><strong>Location:</strong> Local Blood Bank</p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <div className="empty-state">
//                   <p>You haven't made any donations yet.</p>
//                   <button 
//                     className="action-btn" 
//                     onClick={() => navigate('/donate')}
//                   >
//                     Schedule a Donation
//                   </button>
//                 </div>
//               )}
//             </div>
//           )}

//           {user.role === 'receiver' && (
//             <div className="request-history">
//               <h3>My Blood Requests</h3>
//               {requests.length > 0 ? (
//                 <div className="history-cards">
//                   {requests.map((request, index) => (
//                     <div className="history-card" key={index}>
//                       <div className="card-header">
//                         <span className="request-date">{new Date(request.date).toLocaleDateString()}</span>
//                         <span className={`request-status ${request.status.toLowerCase()}`}>
//                           {request.status}
//                         </span>
//                       </div>
//                       <div className="card-body">
//                         <p><strong>Blood Type:</strong> {request.bloodGroup}</p>
//                         <p><strong>Quantity:</strong> {request.quantity} units</p>
//                         <p><strong>Hospital:</strong> {request.hospital}</p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <div className="empty-state">
//                   <p>You haven't made any blood requests yet.</p>
//                   <button 
//                     className="action-btn" 
//                     onClick={() => navigate('/request')}
//                   >
//                     Request Blood
//                   </button>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;







import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [donations, setDonations] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: '',
    bloodGroup: ''
  });

  useEffect(() => {
    // Get user data from localStorage
    const userData = JSON.parse(localStorage.getItem('userData'));
    
    if (!userData) {
      navigate('/login');
      return;
    }
    
    setUser(userData);
    setFormData({
      name: userData.name || '',
      phone: userData.phone || '',
      location: userData.location || '',
      bloodGroup: userData.bloodGroup || ''
    });

    // In a real app, fetch from backend
    // For now, let's use localStorage
    const storedDonations = JSON.parse(localStorage.getItem('donors')) || [];
    const myDonations = storedDonations.filter(d => 
      d.name.toLowerCase() === userData.name?.toLowerCase()
    );
    setDonations(myDonations);

    // Simulating API call completion
    setLoading(false);
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Update user in localStorage (in a real app, update in backend)
    const updatedUser = { ...user, ...formData };
    localStorage.setItem('userData', JSON.stringify(updatedUser));
    setUser(updatedUser);
    setIsEditing(false);
    
    alert('Profile updated successfully!');
  };

  if (loading) {
    return (
      <div className="profile-loading">
        <div className="spinner"></div>
        <p>Loading profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="profile-error">
        <p>Please log in to view your profile.</p>
        <button onClick={() => navigate('/login')}>Go to Login</button>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>My Profile</h1>
        {!isEditing ? (
          <button className="edit-btn" onClick={() => setIsEditing(true)}>
            Edit Profile
          </button>
        ) : null}
      </div>

      <div className="profile-content">
        <div className="profile-card">
          {isEditing ? (
            // Edit Form
            <form onSubmit={handleSubmit} className="edit-form">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={user.email}
                  disabled
                  className="disabled-input"
                />
                <small>Email cannot be changed</small>
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Blood Group</label>
                <select
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleChange}
                  required
                >
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
              </div>

              <div className="form-actions">
                <button type="submit" className="save-btn">Save Changes</button>
                <button 
                  type="button" 
                  className="cancel-btn"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            // Display Profile
            <div className="profile-details">
              <div className="profile-avatar">
                <div className="avatar-placeholder">
                  {user.name?.charAt(0).toUpperCase() || 'U'}
                </div>
                <h2>{user.name}</h2>
                <span className="user-role">{user.role === 'donor' ? 'Blood Donor' : 'Blood Receiver'}</span>
              </div>

              <div className="user-info">
                <div className="info-item">
                  <span className="info-label">Email:</span>
                  <span className="info-value">{user.email}</span>
                </div>
                
                <div className="info-item">
                  <span className="info-label">Phone:</span>
                  <span className="info-value">{user.phone || 'Not provided'}</span>
                </div>
                
                <div className="info-item">
                  <span className="info-label">Location:</span>
                  <span className="info-value">{user.location || 'Not provided'}</span>
                </div>
                
                <div className="info-item">
                  <span className="info-label">Blood Group:</span>
                  <span className="info-value blood-type">{user.bloodGroup || 'Not provided'}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Activity Section */}
        <div className="activity-section">
          {user.role === 'donor' && (
            <div className="donation-history">
              <h3>My Donation History</h3>
              {donations.length > 0 ? (
                <div className="history-cards">
                  {donations.map((donation, index) => (
                    <div className="history-card" key={index}>
                      <div className="card-header">
                        <span className="donation-date">{new Date(donation.date).toLocaleDateString()}</span>
                        <span className="donation-status">Completed</span>
                      </div>
                      <div className="card-body">
                        <p><strong>Blood Type:</strong> {donation.bloodType}</p>
                        <p><strong>Location:</strong> Local Blood Bank</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <p>You haven't made any donations yet.</p>
                  <button 
                    className="action-btn" 
                    onClick={() => navigate('/donate')}
                  >
                    Schedule a Donation
                  </button>
                </div>
              )}
            </div>
          )}

          {user.role === 'receiver' && (
            <div className="request-history">
              <h3>My Blood Requests</h3>
              <div className="empty-state">
                <p>You haven't made any blood requests yet.</p>
                <button 
                  className="action-btn" 
                  onClick={() => navigate('/request')}
                >
                  Request Blood
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;