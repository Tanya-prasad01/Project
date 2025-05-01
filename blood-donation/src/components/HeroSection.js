import React from 'react';
import './HeroSection.css';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section id="hero" className="hero">
      <div className="hero-content">
        <h1>Donate Blood, Save Lives</h1>
        <p>Your one donation can save up to 3 lives.</p>
        <Link to="/donate" className="cta-button">
        Donate Now
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
