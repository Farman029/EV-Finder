import React from 'react';
import Footer from '../components/Footer';
import AboutHero from '../components/About/AboutHero';
import AboutMission from '../components/About/AboutMission';
import AboutDifferent from '../components/About/AboutDifferent';
import AboutStats from '../components/About/AboutStats';

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      <AboutHero />
      <AboutMission />
      <AboutDifferent />
      <AboutStats />
      <Footer />
    </div>
  );
};

export default About;