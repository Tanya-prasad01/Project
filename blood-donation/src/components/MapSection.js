// src/components/MapSection.js
import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: 40.7128,
  lng: -74.0060
};

const MapSection = () => {
  return (
    <section id="map-section">
      <h2>Find a Donation Center Near You</h2>
      <LoadScript googleMapsApiKey="YOUR_GOOGLE_API_KEY">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={12}
        >
          <Marker position={center} />
        </GoogleMap>
      </LoadScript>
    </section>
  );
};

export default MapSection;
