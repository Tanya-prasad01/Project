/*import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Header from './components/Header';
import Home from './pages/Home';
import Search from './pages/Search';
import Login from './pages/Login';
import Donors from './pages/Donors';
import Register from './pages/Register';
import Donate from './pages/Donate'; 

import About from './pages/About';
import Profile from './pages/Profile';
import './App.css';

function App() {
  return (
    <Router>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/donors" element={<Donors />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
        
       
      </Routes>
    </Router>
  );
}

export default App;

*/

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
import Chatbot from './components/Chatbot';
import './App.css';

const Layout = () => {
  const location = useLocation();
  const hideHeader = location.pathname === "/login" || location.pathname === "/register";

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
          <Route path="/chatbot" element={<Chatbot />} />
        </Routes>
      </div>
    </>
  );
};

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;

