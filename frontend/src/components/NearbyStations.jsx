import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NearbyStations = () => {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Get GPS Coordinates from Browser
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;

      try {
        // 2. Call your Phase 1 Backend API
        const response = await axios.get(
          `http://localhost:5000/api/stations/nearest?lat=${latitude}&lng=${longitude}`
        );
        setStations(response.data);
      } catch (err) {
        console.error("Error fetching stations", err);
      } finally {
        setLoading(false);
      }
    });
  }, []);

  const handleNavigate = (lat, lng) => {
    // 3. Open Google Maps with pre-filled destination
    const url = `https://www.google.com/maps/dir/?api=13{lat},${lng}`;
    window.open(url, '_blank');
  };

  if (loading) return <p>Finding nearest charging spots...</p>;

  return (
    <div>
      <h2>Stations Near You</h2>
      {stations.map(station => (
        <div key={station._id} className="station-card">
          <h3>{station.name}</h3>
          <button onClick={() => handleNavigate(station.location.coordinates[1], station.location.coordinates[0])}>
            Open in Google Maps
          </button>
          <button>Book Now</button> 
        </div>
      ))}
    </div>
  );
};

export default NearbyStations;