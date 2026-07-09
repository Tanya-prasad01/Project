// // src/components/EmergencyRequestList.jsx
// import React, { useState, useEffect } from 'react';
// import { Card, Badge, Button, Alert, Spinner, Container, Row, Col } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
// import './EmergencyRequestList.css';

// const EmergencyRequestList = () => {
//   const [emergencyRequests, setEmergencyRequests] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
  
//   // Get token from localStorage
//   const token = localStorage.getItem('token');

//   // Format date function
//   const formatDate = (dateString) => {
//     const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
//     return new Date(dateString).toLocaleDateString(undefined, options);
//   };

//   // Calculate time remaining until expiration
//   const getTimeRemaining = (expiresAt) => {
//     const expireDate = new Date(expiresAt);
//     const now = new Date();
//     const diff = expireDate - now;
    
//     if (diff <= 0) return 'Expired';
    
//     const hours = Math.floor(diff / (1000 * 60 * 60));
//     const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
//     return `${hours}h ${minutes}m`;
//   };

//   // Fetch emergency requests
//   useEffect(() => {
//     const fetchEmergencyRequests = async () => {
//       setLoading(true);
//       try {
//         // First try to load compatible requests for the user
//         const response = await fetch('http://localhost:5000/api/emergency/compatible', {
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         });
        
//         if (!response.ok) {
//           throw new Error('Failed to fetch emergency requests');
//         }
        
//         const data = await response.json();
//         setEmergencyRequests(data);
//         setError('');
//       } catch (err) {
//         console.error('Error fetching emergency requests:', err);
//         setError('Failed to load emergency requests');
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     if (token) {
//       fetchEmergencyRequests();
//     } else {
//       setError('Please log in to view emergency requests');
//       setLoading(false);
//     }
//   }, [token]);

//   if (loading) {
//     return (
//       <div className="text-center p-5">
//         <Spinner animation="border" variant="danger" />
//         <p className="mt-2">Loading emergency requests...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return <Alert variant="danger">{error}</Alert>;
//   }

//   if (emergencyRequests.length === 0) {
//     return (
//       <Alert variant="info">
//         No emergency blood requests currently match your blood type. Thank you for your willingness to help!
//       </Alert>
//     );
//   }

//   return (
//     <Container className="emergency-list-container">
//       <h2 className="text-center mb-4">
//         <Badge bg="danger" className="me-2">URGENT</Badge>
//         Emergency Blood Requests
//       </h2>
      
//       <Row>
//         {emergencyRequests.map(request => (
//           <Col md={6} lg={4} key={request._id} className="mb-4">
//             <Card className="emergency-card h-100">
//               <Card.Header className="d-flex justify-content-between align-items-center">
//                 <h5 className="blood-type mb-0">{request.bloodGroup}</h5>
//                 <Badge bg="warning" text="dark">
//                   Expires in: {getTimeRemaining(request.expiresAt)}
//                 </Badge>
//               </Card.Header>
              
//               <Card.Body>
//                 <Card.Title>{request.patientName}</Card.Title>
//                 <Card.Text>
//                   <strong>Hospital:</strong> {request.hospital}<br />
//                   <strong>Location:</strong> {request.location}<br />
//                   <strong>Units needed:</strong> {request.units}<br />
//                   <strong>Contact:</strong> {request.contactPhone}<br />
//                   <strong>Requested on:</strong> {formatDate(request.createdAt)}
//                 </Card.Text>
                
//                 {request.notes && (
//                   <Card.Text>
//                     <strong>Notes:</strong> {request.notes}
//                   </Card.Text>
//                 )}
//               </Card.Body>
              
//               <Card.Footer className="text-center">
//                 <Button 
//                   variant="danger" 
//                   className="respond-btn"
//                   href={`tel:${request.contactPhone}`}
//                 >
//                   Respond to Request
//                 </Button>
//               </Card.Footer>
//             </Card>
//           </Col>
//         ))}
//       </Row>
      
//       <div className="text-center mt-4">
//         <Button 
//           as={Link} 
//           to="/emergency-request" 
//           variant="outline-danger" 
//           className="create-btn"
//         >
//           Create New Emergency Request
//         </Button>
//       </div>
//     </Container>
//   );
// };

// export default EmergencyRequestList;



//new one 
import React, { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';

const EmergencyNotifications = () => {
  const token = localStorage.getItem('token');
  const shownRequests = useRef(new Set());

  useEffect(() => {
    if (!token) return;

    const fetchRequests = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/emergency/compatible', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        data.forEach((req) => {
          if (!shownRequests.current.has(req._id)) {
            shownRequests.current.add(req._id);

            toast.warn(`Emergency! ${req.units} units of ${req.bloodGroup} needed at ${req.hospital}`, {
              position: 'top-right',
              autoClose: 10000,
              closeOnClick: true,
              draggable: true,
            });
          }
        });
      } catch (err) {
        console.error('Error fetching emergency notifications:', err);
      }
    };

    const intervalId = setInterval(fetchRequests, 30000); // every 30 seconds
    fetchRequests(); // initial load

    return () => clearInterval(intervalId); // cleanup
  }, [token]);

  return null;
};

export default EmergencyNotifications;
