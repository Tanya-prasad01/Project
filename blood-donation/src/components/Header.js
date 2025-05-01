/*import React from 'react';
import { Link } from 'react-router-dom'; // Make sure to install react-router-dom
import './Header.css'; // Import the CSS file
const Header = () => {
    return (
        <header>
            <nav>
                <ul style={styles.navList}>
                    <li style={styles.navItem}>
                        <Link to="/" style={styles.navLink}>Home</Link>
                    </li>
                    <li style={styles.navItem}>
                        <Link to="/donors" style={styles.navLink}>Donors</Link>
                    </li>
                    <li style={styles.navItem}>
                        <Link to="/search" style={styles.navLink}>Search</Link>
                    </li>
                    <li style={styles.navItem}>
                        <Link to="/login" style={styles.navLink}>Login</Link>
                    </li>
                    <li style={styles.navItem}>
                        <Link to="/about" style={styles.navLink}>About Us</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

// Simple styles for the navbar
const styles = {
    navList: {
        listStyleType: 'none',
        display: 'flex',
        justifyContent: 'space-around',
        padding: '10px',
        backgroundColor: '#f8f9fa',
    },
    navItem: {
        margin: '0 15px',
    },
    navLink: {
        textDecoration: 'none',
        color: '#007bff',
        fontWeight: 'bold',
    },
};

export default Header;  
*/

/*
import React from 'react';
import { Link } from 'react-router-dom';
import navLogo from './navLogo.png';
import './Header.css'; 

const Header = () => {
    return (
        <header className="header">
            <nav className="navbar">
                <div className="logo-container">
                    
                    <Link to="/">
                        <img src={navLogo} alt="Blood Connect Logo" className="logo" />
                    </Link>
                </div>
                <ul className="nav-list">
                    <li className="nav-item">
                        <Link to="/" className="nav-link">
                        <i className="fas fa-home"></i>
                        <span>Home</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/donors" className="nav-link">
                        <i className="fas fa-hand-holding-heart nav-icon"></i>
                        
                        <span>Donors</span> 
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/search" className="nav-link">
                        <i className="fas fa-search"></i>
                        <span>Search</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/login" className="nav-link">
                        <i className="fas fa-sign-in-alt"></i>
                        <span>Login</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/about" className="nav-link">
                        <i className="fas fa-info-circle"></i>
                        <span>About</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
*/

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "./Logo.png"; // Ensure the path is correct
import { useLocation, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import "./Header.css"; // Ensure this file exists

import { AiFillHome } from "react-icons/ai"; // Home icon
import { FaHandHoldingHeart } from "react-icons/fa"; // Hand with Heart icon (Blood Donor)
import { BiSearch } from "react-icons/bi"; // Search icon
import { FcAbout } from "react-icons/fc"; // About icon

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    setUser(userData);
  }, []);

  const { name = "", image = "" } = user || {};

  const handleLogout = () => {
    localStorage.clear();
    navigate("/home");
    window.location.reload();
  };

  const handleLogin = () => {
    navigate("/login"); // Make sure your route matches exactly with the route name
  };

  return (
    <Navbar expand="lg" className="navbar header">
      <Container fluid className="background">
        {/* Navbar Brand with logo */}
        <Navbar.Brand onClick={() => navigate("/home")} style={{ cursor: "pointer" }}>
          <img className="logo" src={logo} alt="Blood Donation Logo" />
        </Navbar.Brand>

        {}
        <Navbar.Collapse id="navbarScroll">
          {/* Navigation Links */}
          <Nav className="me-auto my-2 my-lg-0" navbarScroll>
            <Nav.Link className="links" onClick={() => navigate("/")}>
              <AiFillHome className="nav-icon" /> Home
            </Nav.Link>
            <Nav.Link className="links" onClick={() => navigate("/donors")}>
              <FaHandHoldingHeart className="nav-icon" /> Donors
            </Nav.Link>
            <Nav.Link className="links" onClick={() => navigate("/search")}>
              <BiSearch className="nav-icon" /> Search
            </Nav.Link>
            <Nav.Link className="links" onClick={() => navigate("/about")}>
              <FcAbout className="nav-icon" /> About
            </Nav.Link>
          </Nav>

          {/* Show login button if no user is logged in */}
          {!user?.email && location.pathname !== "/login" && (
            <Button variant="outline-success" className="btn" onClick={handleLogin}>
              Login
            </Button>
          )}

          {/* If user is logged in, show their name, profile image, and logout button */}
          {user?.email && (
            <>
              <div className="user-cont">
                {image && <img className="user-img" src={image} alt="User" />}
                <p className="username">{name}</p>
              </div>
              <button className="logout" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
