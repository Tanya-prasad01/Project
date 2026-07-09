// // /*import React from 'react';
// // import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// // // import Header from './components/Header';
// // import Home from './pages/Home';
// // import Search from './pages/Search';
// // import Login from './pages/Login';
// // import Donors from './pages/Donors';
// // import Register from './pages/Register';
// // import Donate from './pages/Donate'; 

// // import About from './pages/About';
// // import Profile from './pages/Profile';
// // import './App.css';

// // function App() {
// //   return (
// //     <Router>
      
// //       <Routes>
// //         <Route path="/" element={<Home />} />
// //         <Route path="/search" element={<Search />} />
// //         <Route path="/login" element={<Login />} />
// //         <Route path="/register" element={<Register />} />
// //         <Route path="/donors" element={<Donors />} />
// //         <Route path="/donate" element={<Donate />} />
// //         <Route path="/about" element={<About />} />
// //         <Route path="/profile" element={<Profile />} />
        
       
// //       </Routes>
// //     </Router>
// //   );
// // }

// // export default App;

// // */

// // import React from 'react';
// // import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
// // import Header from './components/Header';
// // import Home from './pages/Home';
// // import Search from './pages/Search';
// // import Login from './pages/Login';
// // import Donors from './pages/Donors';
// // import Register from './pages/Register';
// // import Donate from './pages/Donate';
// // import RequestBlood from './pages/Request';
// // import About from './pages/About';
// // import Profile from './pages/Profile';
// // import Chatbot from './components/Chatbot';
// // // import ChatbotPortal from './components/ChatbotPortal';
// // import './App.css';

// // const Layout = () => {
// //   const location = useLocation();
// //   const hideHeader = location.pathname === "/login" || location.pathname === "/register";

// //   return (
// //     <>
// //       {!hideHeader && <Header />}
// //       <div className="main-content">
// //         <Routes>
// //           <Route path="/" element={<Home />} />
// //           <Route path="/search" element={<Search />} />
// //           <Route path="/login" element={<Login />} />
// //           <Route path="/register" element={<Register />} />
// //           <Route path="/donors" element={<Donors />} />
// //           <Route path="/donate" element={<Donate />} />
// //           <Route path="/request" element={<RequestBlood />} />
// //           <Route path="/about" element={<About />} />
// //           <Route path="/profile" element={<Profile />} />
// //           <Route path="/chatbot" element={<Chatbot />} />
// //           {/* <Route path="/chatbot-portal" element={<ChatbotPortal />} /> */}
// //         </Routes>
// //       </div>
// //     </>
// //   );
// // };

// // function App() {
// //   return (
// //     <Router>
// //       <Layout />
// //     </Router>
// //   );
// // }

// // export default App;





// import React from 'react';
// import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
// import Header from './components/Header';
// import Home from './pages/Home';
// import Search from './pages/Search';
// import Login from './pages/Login';
// import Donors from './pages/Donors';
// import Register from './pages/Register';
// import Donate from './pages/Donate';
// import RequestBlood from './pages/Request';
// import About from './pages/About';
// import Profile from './pages/Profile';
// import Chatbot from './components/Chatbot';
// import EmergencyRequest from './pages/EmergencyRequest';
// import BloodRequestList from './components/BloodRequestList';
// import './App.css';

// const Layout = () => {
//   const location = useLocation();
//   const hideHeader = location.pathname === "/login" || location.pathname === "/register";

//   return (
//     <>
//       {!hideHeader && <Header />}
//       <div className="main-content">
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/search" element={<Search />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/donors" element={<Donors />} />
//           <Route path="/donate" element={<Donate />} />
//           <Route path="/request" element={<RequestBlood />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/profile" element={<Profile />} />
//         </Routes>
//       </div>
      
//       {/* Chatbot added here - will appear on all pages */}
//       <Chatbot />
//     </>
//   );
// };

// function App() {
//   return (
//     <Router>
//       <Layout />
//     </Router>
//   );
// }

// export default App;



//the new one with all features i guess so hope so , i wish so, i hope it works
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Search from './pages/Search';
import Login from './pages/Login';
import Donors from './pages/Donors';
import Register from './pages/Register';
import Donate from './pages/Donate';
import RequestBlood from './pages/Request';
import About from './pages/About';
import Profile from './pages/Profile';
import Chatbot from './components/Chatbot.jsx';
import EmergencyRequest from './pages/EmergencyRequest.jsx';
import BloodRequestList from './components/BloodRequestList';
import ForgotPassword from './pages/ForgotPassword.jsx';
import ResetPassword from './pages/ResetPassword.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EmergencyAlert from './pages/EmergencyAlert.jsx';
import './App.css';

const Layout = () => {
  const location = useLocation();
  const hideHeader = location.pathname === "/login" || location.pathname === "/register" || 
                     location.pathname === "/forgot-password" || location.pathname.includes("/reset-password");

  return (
    <>
      {!hideHeader && <Header />}
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/donors" element={<Donors />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/request" element={<RequestBlood />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/emergency-request" element={<EmergencyRequest />} />
          <Route path="/blood-requests" element={<BloodRequestList />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} /> 
          <Route path="/emergency-request" element={<EmergencyRequest />} />
        </Routes>
      </div>
      
      {/* Notifications for emergency blood needs */}
      <EmergencyAlert />

      {/* Chatbot added here - will appear on all pages */}
      <Chatbot />
    </>
  );
};

function App() {
  return (
    <Router>
      <Layout />
       <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  );
}

export default App;