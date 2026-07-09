// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import axiosInstance from '../api/axios';
// import './ForgotPassword.css';

// const ForgotPassword = () => {
//   const [email, setEmail] = useState('');
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [previewUrl, setPreviewUrl] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!email) {
//       setError('Email is required');
//       return;
//     }

//     setIsLoading(true);
//     setError('');
    
//     try {
//       const response = await axiosInstance.post('/auth/forgot-password', { email });
      
//       setIsSubmitted(true);
//       setPreviewUrl(response.data.previewUrl); // For development only
//       setIsLoading(false);
//     } catch (error) {
//       console.error('Error:', error);
//       setError(error.response?.data?.message || 'Something went wrong. Please try again.');
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="forgot-password-container">
//       <div className="forgot-password-box">
//         <h1>Forgot Password</h1>
        
//         {!isSubmitted ? (
//           <>
//             <p>
//               Enter your email address below and we'll send you a link to reset your password.
//             </p>
            
//             <form onSubmit={handleSubmit}>
//               <div className="form-group">
//                 <label>Email</label>
//                 <input
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   placeholder="Enter your email"
//                   required
//                 />
//               </div>
              
//               {error && <p className="error-message">{error}</p>}
              
//               <button 
//                 type="submit" 
//                 className="reset-button"
//                 disabled={isLoading}
//               >
//                 {isLoading ? 'Sending...' : 'Send Reset Link'}
//               </button>
//             </form>
            
//             <p className="login-link">
//               Remember your password? <Link to="/login">Login</Link>
//             </p>
//           </>
//         ) : (
//           <div className="success-message">
//             <h2>Email Sent!</h2>
//             <p>We've sent password reset instructions to {email}.</p>
//             <p>Please check your inbox and follow the instructions to reset your password.</p>
            
//             {previewUrl && (
//               <div className="preview-link">
//                 <p>For development: <a href={previewUrl} target="_blank" rel="noopener noreferrer">View Email Preview</a></p>
//               </div>
//             )}
            
//             <button 
//               className="back-button" 
//               onClick={() => window.location.href = '/login'}
//             >
//               Back to Login
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ForgotPassword;


//the new one 
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setError('Email is required');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch('http://localhost:5000/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setIsSubmitted(true);
        if (data.previewUrl) {
          setPreviewUrl(data.previewUrl);
        }
      } else {
        setError(data.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Server error. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-box">
        <h1>Forgot Password</h1>
        
        {!isSubmitted ? (
          <>
            <p className="instruction-text">
              Enter your email address below and we'll send you a link to reset your password.
            </p>
            
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
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
                {isLoading ? 'Sending...' : 'Send Reset Link'}
              </Button>
            </Form>
            
            <div className="login-link">
              <p>Remember your password? <Link to="/login">Login</Link></p>
            </div>
          </>
        ) : (
          <div className="success-message">
            <h2>Email Sent!</h2>
            <p>We've sent password reset instructions to {email}.</p>
            <p>Please check your inbox and follow the instructions to reset your password.</p>
            
            {previewUrl && (
              <div className="preview-link">
                <p>For development: <a href={previewUrl} target="_blank" rel="noopener noreferrer">View Email Preview</a></p>
              </div>
            )}
            
            <Button 
              variant="primary"
              className="back-button" 
              onClick={() => window.location.href = '/login'}
            >
              Back to Login
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;