/*
import React, { useState } from 'react';
import './Login.css'; 

const App = () => {
    const [isRegistering, setIsRegistering] = useState(true);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isRegistering) {
            console.log('Registering:', formData);
            alert('Registration successful!');
        } else {
            console.log('Logging in:', { email: formData.email, password: formData.password });
            alert('Login successful!');
        }
        setFormData({ username: '', email: '', password: '' });
    };

    return (
        <div className="container">
            <h1>Blood Management System</h1>
            <div className="form-toggle">
                <button onClick={() => setIsRegistering(true)}>Register</button>
                <button onClick={() => setIsRegistering(false)}>Login</button>
            </div>
            <form onSubmit={handleSubmit} className="form">
                {isRegistering && (
                    <>
                        <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
                    </>
                )}
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                <button type="submit">{isRegistering ? 'Register' : 'Login'}</button>
            </form>
        </div>
    );
};

export default App;

*/

/*
import React, { useState } from 'react';
import './Login.css';

const App = () => {
    const [isRegistering, setIsRegistering] = useState(true);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isRegistering) {
            console.log('Registering:', formData);
            alert('Registration successful!');
        } else {
            console.log('Logging in:', { email: formData.email, password: formData.password });
            alert('Login successful!');
        }
        setFormData({ username: '', email: '', password: '' });
    };

    return (
        <div className="container">
            <h1>Blood Management System</h1>
            <div className="form-toggle">
                <button onClick={() => setIsRegistering(true)} style={{ background: isRegistering ? '#ff4d4d' : '#eee', color: isRegistering ? '#fff' : '#000' }}>Register</button>
                <button onClick={() => setIsRegistering(false)} style={{ background: !isRegistering ? '#ff4d4d' : '#eee', color: !isRegistering ? '#fff' : '#000' }}>Login</button>
            </div>
            <form onSubmit={handleSubmit} className="form">
                {isRegistering && (
                    <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
                )}
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                <button type="submit">{isRegistering ? 'Register' : 'Login'}</button>
            </form>
        </div>
    );
};

export default App;
*/

/*
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
//import Header from "../Header";
import Form from "react-bootstrap/Form";
import "./Login.css"; // Ensure you have your styling here
import { useLocation, useNavigate, useParams } from "react-router-dom"; // Use useNavigate to navigate
//import Footer from "../Footer/Footer";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoader, setIsLoader] = useState(false); // State for handling loader
  const [errorMessage, setErrorMessage] = useState(""); // Error message state
  const navigate = useNavigate(); // Initialize the useNavigate hook
  const params = useParams();
  const loc = useLocation();

  console.log(params, loc);

  // Get saved user data from localStorage safely
  let parsedUserData = null;
  try {
    const savedUserData = localStorage.getItem("userData");
    parsedUserData = savedUserData ? JSON.parse(savedUserData) : null;
  } catch (error) {
    console.error("Error parsing user data:", error);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoader(true); // Show loader while validating login

    // If no saved user data exists in localStorage, show error
    if (!parsedUserData) {
      setErrorMessage("No user found. Please sign up first!");
      setIsLoader(false);
      return;
    }

    // Validate login credentials
    if (
      formData.email === parsedUserData.email &&
      formData.password === parsedUserData.password
    ) {
      setErrorMessage(""); // Clear any previous error message

      // After successful login, navigate to home page
      console.log("Login successful!");
      navigate("/mainpage"); // Redirect to home page (make sure the route is defined)
    } else {
      setErrorMessage("Invalid credentials. Please try again.");
    }

    setIsLoader(false); // Stop loader after checking credentials
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <>
     
      <div className="login-container">
        <div className="login-section">
          <h3 className="login-title">ExpensoMeter Login</h3>

          <Form onSubmit={handleSubmit}>
            
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>

           
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </Form.Group>

            
            {errorMessage && (
              <div className="error-message">
                <p>{errorMessage}</p>
              </div>
            )}

         
            <Button
              variant="primary"
              type="submit"
              className="login-btn"
              disabled={isLoader}
            >
              Login
            </Button>

            
            {isLoader && <div className="loader">Loading...</div>}

            
            <div className="register-link">
              <p>
                New to ExpensoMeter?{" "}
                <a href="/register">Create an account</a>
              </p>
            </div>
          </Form>
        </div>
      </div>
      
    </>
  );
};

export default Login;
*/

// import React, { useState } from "react";
// import Button from "react-bootstrap/Button";
// // import Header from "../components/Header";
// import Form from "react-bootstrap/Form";
// import "./Login.css";
// import { useLocation, useNavigate, useParams } from "react-router-dom";


// const Login = () => {

//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [isLoader, setIsLoader] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//   const navigate = useNavigate();
//   const params = useParams();
//   const loc = useLocation();

//   console.log(params, loc);

//   let parsedUserData = null;
//   try {
//     const savedUserData = localStorage.getItem("userData");
//     parsedUserData = savedUserData ? JSON.parse(savedUserData) : null;
//   } catch (error) {
//     console.error("Error parsing user data:", error);
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setIsLoader(true);

//     if (!parsedUserData) {
//       setErrorMessage("No registered user found. Please sign up first!");
//       setIsLoader(false);
//       return;
//     }

//     if (
//       formData.email === parsedUserData.email &&
//       formData.password === parsedUserData.password
//     ) {
//       setErrorMessage("");
//       console.log("Login successful!");
//       navigate("/"); // Adjust this route as per your app
//     } else {
//       setErrorMessage("Invalid email or password. Please try again.");
//     }

//     setIsLoader(false);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   return (
   
//     <>
//       {/* <Header /> */}
//      <div className="login-container">
//       <div className="login-section">
//         <h3 className="login-title"> Login</h3>

//         <Form onSubmit={handleSubmit}>
//           {/* Email Input */}
//           <Form.Group className="mb-3" controlId="formBasicEmail">
//             <Form.Label>Email</Form.Label>
//             <Form.Control
//               type="email"
//               placeholder="Enter your email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />
//           </Form.Group>

//           {/* Password Input */}
//           <Form.Group className="mb-3" controlId="formBasicPassword">
//             <Form.Label>Password</Form.Label>
//             <Form.Control
//               type="password"
//               placeholder="Enter your password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//             />
//           </Form.Group>

//           {/* Error Message */}
//           {errorMessage && (
//             <div className="error-message">
//               <p>{errorMessage}</p>
//             </div>
//           )}

//           {/* Login Button */}
//           <Button
//             variant="danger"
//             type="submit"
//             className="login-btn"
            
//             disabled={isLoader}
//           >
//             Login
//           </Button>

//           {/* Loader */}
//           {isLoader && <div className="loader">Loading...</div>}

//           {/* Register Link */}
//           <div className="register-link">
//             <p>
//               New user?  
//               <span onClick={() => navigate("/register")} style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}>Create an account</span>

//             </p>
//           </div>
//         </Form>
//       </div>
//      </div>
//     </>
//   );
// };

// export default Login;




// import React, { useState } from "react";
//  import axios from "axios"; 
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
// import "./Login.css";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [isLoader, setIsLoader] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoader(true);
//     setErrorMessage('');

    
//     try {
//       const response = await fetch('http://localhost:5000/api/auth/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setErrorMessage('');
//         console.log('Login successful!');
        
//         // Save user data or token if needed
//         localStorage.setItem('userData', JSON.stringify(data.user));

//         // Navigate to homepage or dashboard
//         navigate("/");
//       } else {
//         setErrorMessage(data.message || 'Login failed. Please try again.');
//       }

//     } catch (error) {
//       console.error('Error during login:', error);
//       setErrorMessage('Server error. Please try again later.');
//     }

//     setIsLoader(false);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   return (
//     <>
//       <div className="login-container">
//         <div className="login-section">
//           <h3 className="login-title">Login</h3>

//           <Form onSubmit={handleSubmit}>
//             {/* Email Input */}
//             <Form.Group className="mb-3" controlId="formBasicEmail">
//               <Form.Label>Email</Form.Label>
//               <Form.Control
//                 type="email"
//                 placeholder="Enter your email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//               />
//             </Form.Group>

//             {/* Password Input */}
//             <Form.Group className="mb-3" controlId="formBasicPassword">
//               <Form.Label>Password</Form.Label>
//               <Form.Control
//                 type="password"
//                 placeholder="Enter your password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 required
//               />
//             </Form.Group>

//             {/* Error Message */}
//             {errorMessage && (
//               <div className="error-message">
//                 <p>{errorMessage}</p>
//               </div>
//             )}

//             {/* Login Button */}
//             <Button
//               variant="danger"
//               type="submit"
//               className="login-btn"
//               disabled={isLoader}
//             >
//               {isLoader ? 'Logging in...' : 'Login'}
//             </Button>

//             {/* Register Link */}
//             <div className="register-link">
//               <p>
//                 New user?{" "}
//                 <span
//                   onClick={() => navigate("/register")}
//                   style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}
//                 >
//                   Create an account
//                 </span>
//               </p>
//             </div>
//           </Form>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Login;






import React, { useState } from "react";
import axios from "axios"; 
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./Login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoader, setIsLoader] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoader(true);
    setErrorMessage('');
    
 // Debug: Check exactly what's being sent
 console.log('Login attempt with:', JSON.stringify(formData));

    // Basic validation
    if (!formData.email || !formData.password) {
      setErrorMessage('Please enter both email and password');
      setIsLoader(false);
      return;
    }
    
    console.log('Attempting login with:', formData);
    
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email: formData.email.trim(),
        password: formData.password
      });
      
      console.log('Login successful!', response.data);
      
      // Save user data and token
      localStorage.setItem('userData', JSON.stringify(response.data.user));
      localStorage.setItem('token', response.data.token);
      
      // Navigate to homepage or dashboard
      navigate("/");
    } catch (error) {
      console.error('Login error:', error);
      
      if (error.response) {
        // The server responded with an error status
        console.log('Server responded with:', error.response.status, error.response.data);
        setErrorMessage(error.response.data.message || 'Login failed. Please try again.');
      } else if (error.request) {
        // The request was made but no response was received
        console.log('No response received:', error.request);
        setErrorMessage('No response from server. Please check your connection.');
      } else {
        // Something happened in setting up the request
        console.log('Error setting up request:', error.message);
        setErrorMessage('Error setting up request: ' + error.message);
      }
    } finally {
      setIsLoader(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <>
      <div className="login-container">
        <div className="login-section">
          <h3 className="login-title">Login</h3>

          <Form onSubmit={handleSubmit}>
            {/* Email Input */}
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {/* Password Input */}
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {/* Error Message */}
            {errorMessage && (
              <div className="error-message">
                <p>{errorMessage}</p>
              </div>
            )}

            {/* Login Button */}
            <Button
              variant="danger"
              type="submit"
              className="login-btn"
              disabled={isLoader}
            >
              {isLoader ? 'Logging in...' : 'Login'}
            </Button>

            {/* Register Link */}
            <div className="register-link">
              <p>
                New user?{" "}
                <span
                  onClick={() => navigate("/register")}
                  style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}
                >
                  Create an account
                </span>
              </p>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Login;