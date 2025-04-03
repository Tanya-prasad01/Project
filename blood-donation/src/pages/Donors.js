// src/App.js
import React from 'react';
import './Donors.css';
import HeroSection from '../components/HeroSection';
import DonationProcess from '../components/DonationProcess';
import EligibilityCriteria from '../components/EligibilityCriteria';
//import MapSection from '../components/MapSection';

function App() {
  return (
    <div className="App">
      <HeroSection />
      <DonationProcess />
      <EligibilityCriteria />
      {/* <MapSection /> */}
    </div>
  );
}

export default App;
