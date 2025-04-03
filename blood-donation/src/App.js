import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Search from './pages/Search';
import Login from './pages/Login';
import Donors from './pages/Donors';
import Register from './pages/Register'; 
/*import Recipients from './pages/Recipients';*/

/*import About from './pages/About';*/
import './App.css';

function App() {
  return (
    <Router>
      <Header /> {/* Keep Header outside Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/donors" element={<Donors />} />
        
        {/* Uncomment these lines when the components are ready */}
        {/* <Route path="/donors" element={<Donors />} /> */}
        {/* <Route path="/recipients" element={<Recipients />} /> */}
        {/* <Route path="/about" element={<About />} /> */}
        {/* Add more routes as needed */}
       
      </Routes>
    </Router>
  );
}

export default App;
