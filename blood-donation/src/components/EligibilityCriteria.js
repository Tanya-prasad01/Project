// src/components/EligibilityCriteria.js
import React from 'react';
import './EligibilityCriteria.css';

const EligibilityCriteria = () => {
  return (
    <section id="eligibility-criteria" className="eligibility-criteria">
      <h2>Eligibility Criteria</h2>
      <ul>
        <li>Must be at least 18 years old.</li>
        <li>Weigh at least 110 lbs (50 kg).</li>
        <li>Must be in general good health.</li>
        <li>Should not have donated blood in the last 56 days.</li>
      </ul>
    </section>
  );
};

export default EligibilityCriteria;
