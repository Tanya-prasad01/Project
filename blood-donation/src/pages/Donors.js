
import React from 'react';
// import Header from '../components/Header';
import './Donors.css';
import HeroSection from '../components/HeroSection';
import DonationProcess from '../components/DonationProcess';
import EligibilityCriteria from '../components/EligibilityCriteria';
import MapSection from '../components/MapSection';

function Donors() {
  return (
    <div className="App">
      {/* <Header /> */}
      <HeroSection />
      <DonationProcess />
      <EligibilityCriteria />
      <MapSection />
    </div>
  );
}

export default Donors;
