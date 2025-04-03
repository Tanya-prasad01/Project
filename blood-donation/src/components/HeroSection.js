// src/components/HeroSection.js
import React from 'react';
import './HeroSection.css';

const HeroSection = () => {
  return (
    <section id="hero" className="hero">
      <div className="hero-content">
        <h1>Donate Blood, Save Lives</h1>
        <p>Your one donation can save up to 3 lives.</p>
        <a href="#donate-now" className="cta-button">Donate Now</a>
      </div>
    </section>
  );
};

export default HeroSection;
