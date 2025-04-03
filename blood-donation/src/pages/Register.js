import React, { useState } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom"; 
// import Header from "../Header/index.jsx";
// import Footer from "../Footer/Footer.jsx";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    bloodGroup: "",
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
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword ||
      !formData.bloodGroup
    ) {
      setErrorMessage("Please fill all fields.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    if (formData.password.length < 6) {
      setErrorMessage("Password must be at least 6 characters.");
      return;
    }

    setIsLoader(true); 

    setTimeout(() => {
      setIsLoader(false);
      localStorage.setItem("userData", JSON.stringify(formData)); 
      navigate("/login"); 
    }, 1500);
  };

  return (
    <>
      {/* <Header /> */}
      <div className="main-sign-up">
        <div className="signUp-container">
          <h1>Register for Blood Management System</h1>
          <form onSubmit={handleSubmit}>
            {/* Name Input */}
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

            {/* Email Input */}
            <label><b>Email</b></label>
            <input
              className="padding-sec"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />

            {/* Blood Group Input */}
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

            {/* Password Input */}
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

            {/* Confirm Password Input */}
            <label><b>Confirm Password</b></label>
            <input
              className="padding-sec"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Re-enter password"
            />

            {/* Password Info */}
            <p className="password-info">
              Passwords must be at least 6 characters.
            </p>

            {/* Display Error Message */}
            {errorMessage && <p className="error-message">{errorMessage}</p>}

            {/* Loader */}
            {isLoader && <div className="loader">Processing...</div>}

            <button type="submit">Register</button>
          </form>

          {/* Link to Login */}
          <p className="login-link">
            Already have an account?{" "}
            <span onClick={() => navigate("/login")} id="sign-color">
              Login
            </span>
          </p>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Register;
