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
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; 

const Header = () => {
    return (
        <header className="header">
            <nav className="navbar">
                <ul className="nav-list">
                    <li className="nav-item">
                        <Link to="/" className="nav-link">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/donors" className="nav-link">Donors</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/search" className="nav-link">Search</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/login" className="nav-link">Login</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/about" className="nav-link">About Us</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
