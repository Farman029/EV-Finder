import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="relative bg-[#f0fdf4] overflow-hidden pt-20 pb-32">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03]" 
         style={{
  backgroundImage: 'radial-gradient(#7dd3fc 1px, transparent 1px)',
  backgroundSize: '32px 32px'
}}
 
           >
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-green-100 text-green-700 font-semibold text-sm border border-green-200">
           ✨ India's #1 EV Charging Platform
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 mb-8 leading-tight">
          Charge Without Limits <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
            Conquer the Roads
          </span>
        </h1>

        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
          Find, plan, and charge your EV journey across the largest network. 
          Reliable, fast, and always ready when you are.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/all-stations" className="px-8 py-4 bg-green-600 text-white rounded-full font-bold text-lg hover:bg-green-700 transition shadow-lg hover:shadow-green-500/30 transform hover:-translate-y-1">
            Start a Journey ⚡
          </Link>
          <Link to="/all-stations" className="px-8 py-4 bg-white text-gray-800 border border-gray-300 rounded-full font-bold text-lg hover:bg-gray-50 transition shadow-sm hover:shadow-md">
            Find Chargers
          </Link>
        </div>

        

        {/* Floating Badges */}
        <div className="hidden lg:block">
          <div className="absolute top-20 left-10 bg-white p-4 rounded-2xl shadow-xl animate-bounce-slow">
            <span className="text-2xl">⚡</span> <span className="font-bold text-gray-700 ml-2">Fast Charging</span>
          </div>
          <div className="absolute bottom-10 right-10 bg-white p-4 rounded-2xl shadow-xl animate-pulse-slow">
            <span className="text-2xl">📍</span> <span className="font-bold text-gray-700 ml-2">10K+ Stations</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;