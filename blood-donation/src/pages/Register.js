// // import React, { useState } from "react";
// // import axios from "axios";
// // import "./Register.css";
// // import { useNavigate } from "react-router-dom"; 
// // // import Header from '../components/Header';
// // // import Footer from "../Footer/Footer.jsx";

// // const Register = () => {
// //   const navigate = useNavigate();
// //   const [formData, setFormData] = useState({
// //     name: "",
// //     email: "",
// //     password: "",
// //     confirmPassword: "",
// //     bloodGroup: "",
// //   });

// //   const [errorMessage, setErrorMessage] = useState("");
// //   const [isLoader, setIsLoader] = useState(false);

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData({
// //       ...formData,
// //       [name]: value,
// //     });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setErrorMessage("");  // Clear previous error
// //     setIsLoader(true);    // Start loader
    
    
    
// //     // if (
// //     //   !formData.name ||
// //     //   !formData.email ||
// //     //   !formData.password ||
// //     //   !formData.confirmPassword ||
// //     //   !formData.bloodGroup
// //     // ) {
// //     //   setErrorMessage("Please fill all fields.");
// //     //   return;
// //     // }


// //     // Basic Validation
// //     if (Object.values(formData).some(value => value.trim() === "")) {
// //       setErrorMessage("Please fill all fields.");
// //       setIsLoader(false);
// //       return;
// //     }

// //     if (formData.password !== formData.confirmPassword) {
// //       setErrorMessage("Passwords do not match.");
// //       setIsLoader(false); // Hide loader
// //       return;
// //     }

// //     if (formData.password.length < 6) {
// //       setErrorMessage("Password must be at least 6 characters.");
// //       setIsLoader(false); // Hide loader
// //       return;
// //     }


// //     try {
// //       // Send data to backend
// //       const res = await axios.post('http://localhost:5000/api/auth/register', {
// //         name: formData.name,
// //         email: formData.email,
// //         password: formData.password,
// //         bloodGroup: formData.bloodGroup,
// //       });

// //       console.log('Registration Success:', res.data);
// //       setIsLoader(false);
// //       navigate('/login'); // Go to login page after success

// //     } catch (err) {
// //       console.error('Registration Failed:', err.response.data);
// //       setErrorMessage(err.response.data.message || 'Registration failed');
// //       setIsLoader(false); // Hide loader
// //     }
// //   };



// //   //   setIsLoader(true); 

// //   //   setTimeout(() => {
// //   //     setIsLoader(false);
// //   //     localStorage.setItem("userData", JSON.stringify(formData)); 
// //   //     navigate("/login"); 
// //   //   }, 1500);
// //   // };

// //   return (
// //     <>
// //       {/* <Header />  */}
// //       <div className="main-sign-up">
// //         <div className="signUp-container">
// //           <h1>Registration Form</h1>
// //           <form onSubmit={handleSubmit}>
// //             {/* Name Input */}
// //             <label><b>Full Name</b></label>
// //             <input
// //               className="padding-sec"
// //               type="text"
// //               name="name"
// //               value={formData.name}
// //               onChange={handleChange}
// //               placeholder="Enter your full name"
// //               required
// //             />

// //             {/* Email Input */}
// //             <label><b>Email</b></label>
// //             <input
// //               className="padding-sec"
// //               type="email"
// //               name="email"
// //               value={formData.email}
// //               onChange={handleChange}
// //               required
// //               placeholder="Enter your email"
// //             />

// //             {/* Blood Group Input */}
// //             <label><b>Blood Group</b></label>
// //             <select
// //               className="padding-sec"
// //               name="bloodGroup"
// //               value={formData.bloodGroup}
// //               onChange={handleChange}
// //               required
// //             >
// //               <option value="">Select Blood Group</option>
// //               <option value="A+">A+</option>
// //               <option value="A-">A-</option>
// //               <option value="B+">B+</option>
// //               <option value="B-">B-</option>
// //               <option value="O+">O+</option>
// //               <option value="O-">O-</option>
// //               <option value="AB+">AB+</option>
// //               <option value="AB-">AB-</option>
// //             </select>

// //             {/* Password Input */}
// //             <label><b>Password</b></label>
// //             <input
// //               className="padding-sec"
// //               type="password"
// //               name="password"
// //               value={formData.password}
// //               onChange={handleChange}
// //               placeholder="At least 6 characters"
// //               required
// //             />

// //             {/* Confirm Password Input */}
// //             <label><b>Confirm Password</b></label>
// //             <input
// //               className="padding-sec"
// //               type="password"
// //               name="confirmPassword"
// //               value={formData.confirmPassword}
// //               onChange={handleChange}
// //               required
// //               placeholder="Re-enter password"
// //             />

// //             {/* Password Info */}
// //             <p className="password-info">
// //               Passwords must be at least 6 characters.
// //             </p>

// //             {/* Display Error Message */}
// //             {errorMessage && <p className="error-message">{errorMessage}</p>}

// //             {/* Loader */}
// //             {isLoader && <div className="loader">Processing...</div>}

// //             {/* <button type="submit">Register</button> */}

// //             <button type="submit" disabled={isLoader}>
// //               {isLoader ? "Registering..." : "Register"}
// //             </button>
// //           </form>

// //           {/* Link to Login */}
// //           <p className="login-link">
// //             Already have an account?{" "}
// //             <span onClick={() => navigate("/login")} id="sign-color">
// //               Login
// //             </span>
// //           </p>
// //         </div>
// //       </div>
// //       {/* <Footer /> */}
// //     </>
// //   );
// // };

// // export default Register;




// import React, { useState } from "react";
// import axios from "../api/axios";
// // import axiosInstance from "../api/axios";
// import "./Register.css";
// import { useNavigate } from "react-router-dom";

// const Register = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     location: "",
//     password: "",
//     confirmPassword: "",
//     bloodGroup: "",
//     role: "receiver", // default
//   });

//   const [errorMessage, setErrorMessage] = useState("");
//   const [isLoader, setIsLoader] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrorMessage("");
//     setIsLoader(true);

//     // Basic Validation
//     if (Object.values(formData).some(value => value.trim() === "")) {
//       setErrorMessage("Please fill all fields.");
//       setIsLoader(false);
//       return;
//     }

//     if (formData.password !== formData.confirmPassword) {
//       setErrorMessage("Passwords do not match.");
//       setIsLoader(false);
//       return;
//     }

//     if (formData.password.length < 6) {
//       setErrorMessage("Password must be at least 6 characters.");
//       setIsLoader(false);
//       return;
//     }

//     try {
//       const res = await axios.post("http://localhost:5000/api/auth/register", {
//         name: formData.name,
//         email: formData.email,
//         phone: formData.phone,
//         location: formData.location,
//         password: formData.password,
//         bloodGroup: formData.bloodGroup,
//         role: formData.role,
//       });

//       console.log("Registration Success:", res.data);
//       setIsLoader(false);
//       navigate("/login");
//     } catch (err) {
//       console.error("Registration Failed:", err.response?.data || err);
//       setErrorMessage(err.response?.data?.message || "Registration failed");
//       setIsLoader(false);
//     }
//   };

//   return (
//     <div className="main-sign-up">
//       <div className="signUp-container">
//         <h1>Registration Form</h1>
//         <form onSubmit={handleSubmit}>
//           <label><b>Full Name</b></label>
//           <input
//             className="padding-sec"
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             placeholder="Enter your full name"
//             required
//           />

//           <label><b>Email</b></label>
//           <input
//             className="padding-sec"
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             placeholder="Enter your email"
//             required
//           />

//           <label><b>Phone</b></label>
//           <input
//             className="padding-sec"
//             type="tel"
//             name="phone"
//             value={formData.phone}
//             onChange={handleChange}
//             placeholder="Enter your phone number"
//             required
//           />

//           <label><b>Location</b></label>
//           <input
//             className="padding-sec"
//             type="text"
//             name="location"
//             value={formData.location}
//             onChange={handleChange}
//             placeholder="Enter your location"
//             required
//           />

//           <label><b>Blood Group</b></label>
//           <select
//             className="padding-sec"
//             name="bloodGroup"
//             value={formData.bloodGroup}
//             onChange={handleChange}
//             required
//           >
//             <option value="">Select Blood Group</option>
//             <option value="A+">A+</option>
//             <option value="A-">A-</option>
//             <option value="B+">B+</option>
//             <option value="B-">B-</option>
//             <option value="O+">O+</option>
//             <option value="O-">O-</option>
//             <option value="AB+">AB+</option>
//             <option value="AB-">AB-</option>
//           </select>

//           <label><b>Role</b></label>
//           <select
//             className="padding-sec"
//             name="role"
//             value={formData.role}
//             onChange={handleChange}
//             required
//           >
//             <option value="receiver">Receiver</option>
//             <option value="donor">Donor</option>
//           </select>

//           {formData.role === "donor" && (
//             <p className="role-info">You will be contacted when someone needs your blood type.</p>
//           )}
//           {formData.role === "receiver" && (
//             <p className="role-info">You can search for available donors when needed.</p>
//           )}

//           <label><b>Password</b></label>
//           <input
//             className="padding-sec"
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             placeholder="At least 6 characters"
//             required
//           />

//           <label><b>Confirm Password</b></label>
//           <input
//             className="padding-sec"
//             type="password"
//             name="confirmPassword"
//             value={formData.confirmPassword}
//             onChange={handleChange}
//             placeholder="Re-enter password"
//             required
//           />

//           <p className="password-info">Passwords must be at least 6 characters.</p>

//           {errorMessage && <p className="error-message">{errorMessage}</p>}
//           {isLoader && <div className="loader">Processing...</div>}

//           <button type="submit" disabled={isLoader}>
//             {isLoader ? "Registering..." : "Register"}
//           </button>
//         </form>

//         <p className="login-link">
//           Already have an account?{" "}
//           <span onClick={() => navigate("/login")} id="sign-color">
//             Login
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Register;



import React, { useState } from "react";
import axiosInstance from "../api/axios";
import "./Register.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    password: "",
    confirmPassword: "",
    bloodGroup: "",
    role: "receiver", // default
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [isLoader, setIsLoader] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoader(true);

    // Basic Validation
    if (Object.values(formData).some(value => value.trim() === "")) {
      setErrorMessage("Please fill all fields.");
      setIsLoader(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match.");
      setIsLoader(false);
      return;
    }

    if (formData.password.length < 6) {
      setErrorMessage("Password must be at least 6 characters.");
      setIsLoader(false);
      return;
    }

    // Create registration data object
    const registrationData = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      location: formData.location.trim(),
      password: formData.password,
      bloodGroup: formData.bloodGroup,
      role: formData.role,
    };

    console.log("Sending registration data:", registrationData);

    try {
      console.log("About to send registration request");
      const res = await axiosInstance({
        method: 'post',
        url: '/auth/register', // <-- CHANGE HERE: Remove the http://localhost:5000 part
        // url: 'http://localhost:5000/api/auth/register',
        data: registrationData,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log("Registration Success:", res.data);
      setIsLoader(false);
      navigate("/login");
    } catch (error) {
      console.error("Registration Failed:", error);
      console.log("Error details:", JSON.stringify(error, null, 2));
      setErrorMessage("Registration failed. Please try again later.");
      setIsLoader(false);
    }
  };

  //   try {
  //     // const res = await axiosInstance.post("http://localhost:5000/api/auth/register", registrationData);
  //     const res = await axiosInstance.post("/auth/register", registrationData);
  //     console.log("Registration Success:", res.data);
  //     setIsLoader(false);
  //     navigate("/login");
  //   } catch (error) {
  //     console.error("Registration Failed:", error);
      
  //     if (error.response) {
  //       // The server responded with an error status
  //       console.log('Server responded with:', error.response.status, error.response.data);
  //       setErrorMessage(error.response.data.message || "Registration failed");
  //     } else if (error.request) {
  //       // The request was made but no response was received
  //       console.log('No response received:', error.request);
  //       setErrorMessage('No response from server. Please check your connection.');
  //     } else {
  //       // Something happened in setting up the request
  //       console.log('Error setting up request:', error.message);
  //       setErrorMessage('Error setting up request: ' + error.message);
  //     }
      
  //     setIsLoader(false);
  //   }
  // };

  return (
    <div className="main-sign-up">
      <div className="signUp-container">
        <h1>Registration Form</h1>
        <form onSubmit={handleSubmit}>
          <label><b>Full Name</b></label>
          <input
            className="padding-sec"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
          />

          <label><b>Email</b></label>
          <input
            className="padding-sec"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />

          <label><b>Phone</b></label>
          <input
            className="padding-sec"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            required
          />

          <label><b>Location</b></label>
          <input
            className="padding-sec"
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter your location"
            required
          />

          <label><b>Blood Group</b></label>
          <select
            className="padding-sec"
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
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>

          <label><b>Role</b></label>
          <select
            className="padding-sec"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="receiver">Receiver</option>
            <option value="donor">Donor</option>
          </select>

          {formData.role === "donor" && (
            <p className="role-info">You will be contacted when someone needs your blood type.</p>
          )}
          {formData.role === "receiver" && (
            <p className="role-info">You can search for available donors when needed.</p>
          )}

          <label><b>Password</b></label>
          <input
            className="padding-sec"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="At least 6 characters"
            required
          />

          <label><b>Confirm Password</b></label>
          <input
            className="padding-sec"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Re-enter password"
            required
          />

          <p className="password-info">Passwords must be at least 6 characters.</p>

          {errorMessage && <p className="error-message">{errorMessage}</p>}
          {isLoader && <div className="loader">Processing...</div>}

          <button type="submit" disabled={isLoader}>
            {isLoader ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="login-link">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")} id="sign-color">
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;