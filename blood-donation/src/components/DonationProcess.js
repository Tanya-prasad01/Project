// src/components/DonationProcess.js
import React from 'react';
import './DonationProcess.css';

const DonationProcess = () => {
  return (
    <section id="donation-process" className="donation-process">
      <h2>How It Works</h2>
      <div className="process-steps">
        <div className="step">
          <h3>Step 1: Register</h3>
          <p>Sign up and complete a quick health screening.</p>
        </div>
        <div className="step">
          <h3>Step 2: Donate Blood</h3>
          <p>Donate whole blood, platelets, or plasma based on your eligibility.</p>
        </div>
        <div className="step">
          <h3>Step 3: Rest & Refresh</h3>
          <p>Enjoy a snack and drink to replenish your energy.</p>
        </div>
      </div>
    </section>
  );
};

export default DonationProcess;
