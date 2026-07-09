// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate, Link } from 'react-router-dom';
// import axiosInstance from '../api/axios';
// import './ResetPassword.css';

// const ResetPassword = () => {
//   const { token } = useParams();
//   const navigate = useNavigate();
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [tokenValid, setTokenValid] = useState(true);

//   useEffect(() => {
//     // Optionally validate token when component loads
//     if (!token) {
//       setTokenValid(false);
//       setError('Invalid reset link');
//     }
//   }, [token]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // Validation
//     if (password.length < 6) {
//       setError('Password must be at least 6 characters');
//       return;
//     }
    
//     if (password !== confirmPassword) {
//       setError('Passwords do not match');
//       return;
//     }

//     setIsLoading(true);
//     setError('');
    
//     try {
//       await axiosInstance.post(`/auth/reset-password/${token}`, { password });
      
//       setIsSubmitted(true);
//       setIsLoading(false);
      
//       // Redirect to login after 3 seconds
//       setTimeout(() => {
//         navigate('/login');
//       }, 3000);
//     } catch (error) {
//       console.error('Error:', error);
      
//       if (error.response?.status === 400 && error.response?.data?.message === 'Invalid or expired token') {
//         setTokenValid(false);
//       }
      
//       setError(error.response?.data?.message || 'Something went wrong. Please try again.');
//       setIsLoading(false);
//     }
//   };

//   if (!tokenValid) {
//     return (
//       <div className="reset-password-container">
//         <div className="reset-password-box">
//           <h1>Invalid Reset Link</h1>
//           <p>
//             The password reset link is invalid or has expired.
//             Please request a new link.
//           </p>
//           <Link to="/forgot-password" className="request-link">
//             Request New Reset Link
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="reset-password-container">
//       <div className="reset-password-box">
//         <h1>Reset Password</h1>
        
//         {!isSubmitted ? (
//           <>
//             <p>
//               Enter your new password below.
//             </p>
            
//             <form onSubmit={handleSubmit}>
//               <div className="form-group">
//                 <label>New Password</label>
//                 <input
//                   type="password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   placeholder="At least 6 characters"
//                   required
//                 />
//               </div>
              
//               <div className="form-group">
//                 <label>Confirm Password</label>
//                 <input
//                   type="password"
//                   value={confirmPassword}
//                   onChange={(e) => setConfirmPassword(e.target.value)}
//                   placeholder="Re-enter your password"
//                   required
//                 />
//               </div>
              
//               {error && <p className="error-message">{error}</p>}
              
//               <button 
//                 type="submit" 
//                 className="reset-button"
//                 disabled={isLoading}
//               >
//                 {isLoading ? 'Updating...' : 'Reset Password'}
//               </button>
//             </form>
//           </>
//         ) : (
//           <div className="success-message">
//             <h2>Password Reset Complete!</h2>
//             <p>Your password has been successfully updated.</p>
//             <p>You will be redirected to the login page in a few seconds...</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ResetPassword;


//new one with improved one
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import './ResetPassword.css';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [tokenValid, setTokenValid] = useState(true);

  useEffect(() => {
    // Optionally validate token when component loads
    if (!token) {
      setTokenValid(false);
      setError('Invalid reset link');
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      await axios.post(`http://localhost:5000/api/auth/reset-password/${token}`, { password });
      
      setIsSubmitted(true);
      setIsLoading(false);
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error) {
      console.error('Error:', error);
      
      if (error.response?.status === 400 && error.response?.data?.message === 'Invalid or expired token') {
        setTokenValid(false);
      }
      
      setError(error.response?.data?.message || 'Something went wrong. Please try again.');
      setIsLoading(false);
    }
  };

  if (!tokenValid) {
    return (
      <div className="reset-password-container">
        <div className="reset-password-box">
          <h1>Invalid Reset Link</h1>
          <p className="instruction-text">
            The password reset link is invalid or has expired.
            Please request a new link.
          </p>
          <Link to="/forgot-password" className="request-link">
            Request New Reset Link
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="reset-password-container">
      <div className="reset-password-box">
        <h1>Reset Password</h1>
        
        {!isSubmitted ? (
          <>
            <p className="instruction-text">
              Enter your new password below.
            </p>
            
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  required
                />
              </Form.Group>
              
              <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter your password"
                  required
                />
              </Form.Group>
              
              {error && <div className="error-message">{error}</div>}
              
              <Button 
                variant="danger"
                type="submit" 
                className="reset-button"
                disabled={isLoading}
              >
                {isLoading ? 'Updating...' : 'Reset Password'}
              </Button>
            </Form>
          </>
        ) : (
          <div className="success-message">
            <h2>Password Reset Complete!</h2>
            <p>Your password has been successfully updated.</p>
            <p>You will be redirected to the login page in a few seconds...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;


