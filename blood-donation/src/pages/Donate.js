/*
{
// import React from 'react';
// import './Donate.css'; // Custom styles here
// import Header from '../components/Header';
// function Donate() {
//   return (
//     // <div className="app-container">
//     //   <header className="header">
//     //     <div className="navbar">
//     //       <div className="logo">
//     //         <img
//     //           src="https://storage.googleapis.com/a1aa/image/fs_vVwI4TWCYCJjVngJtQpM55EBSYI4zEn_fW5no2To.jpg"
//     //           alt="BloodBank logo"
//     //           className="logo-img"
//     //         />
//     //         <span className="logo-text">BloodBank</span>
//     //       </div>
//     //       <nav className="nav-links">
//     //         <a href="#">Home</a>
//     //         <a href="#" className="active">Donor</a>
//     //         <a href="#">Recipient</a>
//     //         <a href="#">About</a>
//     //         <a href="#">Login</a>
//     //       </nav>
//     //     </div>
//     <>
//       <Header/>

//       <main className="main-content">
//         <div className="intro-text">
//           <h1>Become a Blood Donor</h1>
//           <p>Your donation can make a life-changing difference</p>
//         </div>

//         <div className="content-grid">
//           <section className="card">
//             <h2>Donation Process</h2>
//             <ul className="process-list">
//               <li>
//                 <i className="fas fa-user-check icon" />
//                 <div>
//                   <h3>Registration</h3>
//                   <p>Fill out donor information form</p>
//                 </div>
//               </li>
//               <li>
//                 <i className="fas fa-calendar-alt icon" />
//                 <div>
//                   <h3>Appointment</h3>
//                   <p>Schedule your donation time</p>
//                 </div>
//               </li>
//               <li>
//                 <i className="fas fa-tint icon" />
//                 <div>
//                   <h3>Donation</h3>
//                   <p>The actual donation takes about 10-15 minutes</p>
//                 </div>
//               </li>
//               <li>
//                 <i className="fas fa-coffee icon" />
//                 <div>
//                   <h3>Recovery</h3>
//                   <p>Light refreshments and short rest</p>
//                 </div>
//               </li>
//             </ul>
//           </section>

//           <section className="card">
//             <h2>Schedule Donation</h2>
//             <form>
//               <label>Full Name</label>
//               <input type="text" placeholder="Enter your full name" />

//               <label>Blood Type</label>
//               <select>
//                 <option>Select blood type</option>
//                 <option>A+</option>
//                 <option>A-</option>
//                 <option>B+</option>
//                 <option>B-</option>
//                 <option>AB+</option>
//                 <option>AB-</option>
//                 <option>O+</option>
//                 <option>O-</option>
//               </select>

//               <label>Preferred Date</label>
//               <input type="date" />

//               <label>Phone Number</label>
//               <input type="tel" placeholder="Enter your phone number" />

//               <button type="submit">Schedule Appointment</button>
//             </form>
//           </section>
//         </div>
//       </main>
    
//     </>
//   );
// }

// export default Donate;
}

*/


import React, { useState } from 'react';
import './Donate.css';
// import Header from '../components/Header';

function Donate() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    bloodType: '',
    date: '',
    phone: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Age validation
    const age = parseInt(formData.age, 10);
    if (isNaN(age) || age < 18 || age > 65) {
      alert('Age must be between 18 and 65 to donate blood.');
      return;
    }

    const existingDonors = JSON.parse(localStorage.getItem('donors')) || [];
    const updatedDonors = [...existingDonors, formData];
    localStorage.setItem('donors', JSON.stringify(updatedDonors));

    alert('Donation scheduled successfully!');
    setFormData({ name: '', age: '', bloodType: '', date: '', phone: '' });
  };

  return (
    <>
      {/* <Header /> */}

      <main className="main-content">
        <div className="intro-text">
          <h1>Become a Blood Donor</h1>
          <p>Your donation can make a life-changing difference</p>
        </div>

        <div className="content-grid">
          <section className="card">
            <h2>Donation Process</h2>
            <ul className="process-list">
              <li>
                <i className="fas fa-user-check icon" />
                <div>
                  <h3>Registration</h3>
                  <p>Fill out donor information form</p>
                </div>
              </li>
              <li>
                <i className="fas fa-calendar-alt icon" />
                <div>
                  <h3>Appointment</h3>
                  <p>Schedule your donation time</p>
                </div>
              </li>
              <li>
                <i className="fas fa-tint icon" />
                <div>
                  <h3>Donation</h3>
                  <p>The actual donation takes about 10-15 minutes</p>
                </div>
              </li>
              <li>
                <i className="fas fa-coffee icon" />
                <div>
                  <h3>Recovery</h3>
                  <p>Light refreshments and short rest</p>
                </div>
              </li>
            </ul>
          </section>

          <section className="card">
            <h2>Schedule Donation</h2>
            <form onSubmit={handleSubmit}>
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />

              <label>Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Enter your age"
                required
              />

              <label>Blood Type</label>
              <select
                name="bloodType"
                value={formData.bloodType}
                onChange={handleChange}
                required
              >
                <option value="">Select blood type</option>
                <option>A+</option>
                <option>A-</option>
                <option>B+</option>
                <option>B-</option>
                <option>AB+</option>
                <option>AB-</option>
                <option>O+</option>
                <option>O-</option>
              </select>

              <label>Preferred Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />

              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                required
              />

              <button type="submit">Schedule Appointment</button>
            </form>
          </section>
        </div>
      </main>
    </>
  );
}

export default Donate;
