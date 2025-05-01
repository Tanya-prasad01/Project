// // // import React from 'react';
// // // import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

// // // const containerStyle = {
// // //   width: '100%',
// // //   height: '400px'
// // // };

// // // const center = {
// // //   lat: 40.7128,
// // //   lng: -74.0060
// // // };

// // // const MapSection = () => {
// // //   return (
// // //     <section id="map-section">
// // //       <h2>Find a Donation Center Near You</h2>
// // //       <LoadScript googleMapsApiKey="YOUR_GOOGLE_API_KEY">
// // //         <GoogleMap
// // //           mapContainerStyle={containerStyle}
// // //           center={center}
// // //           zoom={12}
// // //         >
// // //           <Marker position={center} />
// // //         </GoogleMap>
// // //       </LoadScript>
// // //     </section>
// // //   );
// // // };

// // // export default MapSection;



// // // src/components/MapSection.jsx
// // import React from 'react';
// // import './MapSection.css';

// // const MapSection = () => {
// //   return (
// //     <section className="map-section">
// //       <h2>Find Donation Centers Near You</h2>
// //       <div className="map-container">
// //         <iframe 
// //           src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15057.534307180755!2d-75.2271!3d40.0379!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1651234567890!5m2!1sen!2sus" 
// //           width="100%" 
// //           height="450" 
// //           style={{ border: 0 }} 
// //           allowFullScreen="" 
// //           loading="lazy" 
// //           referrerPolicy="no-referrer-when-downgrade"
// //         ></iframe>
// //       </div>
// //       <div className="location-list">
// //         <h3>Blood Donation Centers</h3>
// //         <ul>
// //           <li>
// //             <h4>City Medical Center</h4>
// //             <p>123 Main Street, Anytown, USA</p>
// //             <p>Hours: 9am-5pm, Mon-Fri</p>
// //           </li>
// //           <li>
// //             <h4>Community Hospital Blood Bank</h4>
// //             <p>456 Oak Avenue, Anytown, USA</p>
// //             <p>Hours: 8am-8pm, 7 days a week</p>
// //           </li>
// //           <li>
// //             <h4>Regional Blood Donation Facility</h4>
// //             <p>789 Elm Boulevard, Anytown, USA</p>
// //             <p>Hours: 10am-6pm, Mon-Sat</p>
// //           </li>
// //         </ul>
// //       </div>
// //     </section>
// //   );
// // };

// // export default MapSection;

// // src/components/MapSection.jsx
// import React from 'react';
// import './MapSection.css';

// const MapSection = () => {
//   return (
//     <section id="map-section" className="map-section">
//       <h2>Find Donation Centers</h2>
//       <div className="map-container">
//         <iframe 
//           src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15057.534307180755!2d-75.2271!3d40.0379!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1651234567890!5m2!1sen!2sus" 
//           width="100%" 
//           height="450" 
//           style={{ border: 0 }} 
//           allowFullScreen="" 
//           loading="lazy" 
//           referrerPolicy="no-referrer-when-downgrade"
//           title="Blood Donation Centers Map"
//         ></iframe>
//       </div>
//       <div className="centers-list">
//         <h3>Nearby Donation Centers</h3>
//         <div className="center-cards">
//           <div className="center-card">
//             <h4>City Blood Bank</h4>
//             <p><i className="fa fa-map-marker"></i> 123 Main Street, Anytown</p>
//             <p><i className="fa fa-clock-o"></i> 9:00 AM - 5:00 PM (Mon-Fri)</p>
//             <p><i className="fa fa-phone"></i> (555) 123-4567</p>
//             <button className="appointment-btn">Schedule Appointment</button>
//           </div>
          
//           <div className="center-card">
//             <h4>Memorial Hospital Donor Center</h4>
//             <p><i className="fa fa-map-marker"></i> 456 Hospital Drive, Anytown</p>
//             <p><i className="fa fa-clock-o"></i> 8:00 AM - 8:00 PM (Daily)</p>
//             <p><i className="fa fa-phone"></i> (555) 987-6543</p>
//             <button className="appointment-btn">Schedule Appointment</button>
//           </div>
          
//           <div className="center-card">
//             <h4>Community Blood Center</h4>
//             <p><i className="fa fa-map-marker"></i> 789 Oak Avenue, Anytown</p>
//             <p><i className="fa fa-clock-o"></i> 10:00 AM - 6:00 PM (Mon-Sat)</p>
//             <p><i className="fa fa-phone"></i> (555) 456-7890</p>
//             <button className="appointment-btn">Schedule Appointment</button>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default MapSection;


import React from 'react';
import './MapSection.css';

const MapSection = () => {
  return (
    <section id="map-section" className="map-section">
      <h2>Find Donation Centers</h2>
      <div className="map-container">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15057.534307180755!2d-75.2271!3d40.0379!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1651234567890!5m2!1sen!2sus" 
          width="100%" 
          height="450" 
          style={{ border: 0 }} 
          allowFullScreen="" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="Blood Donation Centers Map"
        ></iframe>
      </div>
      <div className="centers-list">
        <h3>Nearby Donation Centers</h3>
        <div className="center-cards">
          <div className="center-card">
            <h4>City Blood Bank</h4>
            <p><i className="fa fa-map-marker"></i> 123 Main Street, Anytown</p>
            <p><i className="fa fa-clock-o"></i> 9:00 AM - 5:00 PM (Mon-Fri)</p>
            <p><i className="fa fa-phone"></i> (555) 123-4567</p>
            <button className="appointment-btn">Schedule Appointment</button>
          </div>
          
          <div className="center-card">
            <h4>Memorial Hospital Donor Center</h4>
            <p><i className="fa fa-map-marker"></i> 456 Hospital Drive, Anytown</p>
            <p><i className="fa fa-clock-o"></i> 8:00 AM - 8:00 PM (Daily)</p>
            <p><i className="fa fa-phone"></i> (555) 987-6543</p>
            <button className="appointment-btn">Schedule Appointment</button>
          </div>
          
          <div className="center-card">
            <h4>Community Blood Center</h4>
            <p><i className="fa fa-map-marker"></i> 789 Oak Avenue, Anytown</p>
            <p><i className="fa fa-clock-o"></i> 10:00 AM - 6:00 PM (Mon-Sat)</p>
            <p><i className="fa fa-phone"></i> (555) 456-7890</p>
            <button className="appointment-btn">Schedule Appointment</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapSection;