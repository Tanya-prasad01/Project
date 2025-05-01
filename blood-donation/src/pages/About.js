// import React from 'react';
// import Header from '../components/Header';
// import './About.css';

// const About = () => {
//     return (
//         <> 
//         <Header/>
//         <div className="container">
//             <h1>About Our Blood Bank</h1>
//             <p>We're dedicated to saving lives through blood donation and ensuring a safe, reliable blood supply for our community.</p>
//             <div className="mission">
//                 <h2>Our Mission</h2>
//                 <p>
//                     Founded in 2020, our blood bank has been at the forefront of ensuring a safe and reliable blood supply for our community. We work tirelessly to connect donors with recipients and maintain the highest standards of safety and service.
//                 </p>
//                 <div className="stats">
//                     <div className="stat">
//                         <h3>10,000+</h3>
//                         <p>Lives Saved</p>
//                     </div>
//                     <div className="stat">
//                         <h3>5,000+</h3>
//                         <p>Active Donors</p>
//                     </div>
//                     <div className="stat">
//                         <h3>15</h3>
//                         <p>Locations</p>
//                     </div>
//                     <div className="stat">
//                         <h3>24/7</h3>
//                         <p>Support Hours</p>
//                     </div>
//                 </div>
//             </div>
//             <div className="contact">
//                 <h2>Contact Us</h2>
//                 <p><strong>Get in Touch</strong></p>
//                 <p>📞 1-800-BLOOD-BANK</p>
//                 <p>✉️ support@bloodbank.com</p>
//                 <p><strong>Emergency Contact</strong></p>
//                 <p>📞 911 <br/> For immediate medical assistance</p>
//             </div>
//         </div>
//     </> 
//     );
// };

// export default About;


import React from 'react';
// import Header from '../components/Header';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './About.css';
import bloodBankImage from '../components/about.png';


const About = () => {
    return (
        <>
          {/* <Header /> */}
          
        <div className="blood-bank-container">
            <div className="blood-bank-header">
            <h1>About Our Blood Bank</h1>
            <p>We're dedicated to saving lives through blood donation and ensuring a safe, reliable blood supply for our community.</p>
            </div>

            <div className="blood-bank-mission">
            <div className="blood-bank-image-container">
            <img src={bloodBankImage} alt="Blood Bank" className="blood-bank-image" />
            </div>
                <div className="mission-content">
                    <h2>Our Mission</h2>
                    <p>Founded in 2020, our blood bank has been at the forefront of ensuring a safe and reliable blood supply for our community. We work tirelessly to connect donors with recipients and maintain the highest standards of safety and service.</p>
                    <div className="stats">
                        <div className="stat">
                            <h3>10,000+</h3>
                            <p>Lives Saved</p>
                        </div>
                        <div className="stat">
                            <h3>5,000+</h3>
                            <p>Active Donors</p>
                        </div>
                        <div className="stat">
                            <h3>15</h3>
                            <p>Locations</p>
                        </div>
                        <div className="stat">
                            <h3>24/7</h3>
                            <p>Support Hours</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="contact-section">
                <h2>Contact Us</h2>
                <p>Get in Touch</p>
                <p>📞 1-800-BLOOD-BANK</p>
                <p>Email: <a href="mailto:support@bloodbank.com">support@bloodbank.com</a></p>
                <h3>Emergency Contact</h3>
                <p>📞 911</p>
                <p>For immediate medical assistance</p>
            </div>
        </div>
        </>
    );
};

export default About;