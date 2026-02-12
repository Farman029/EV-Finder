import React from 'react';
import { Link } from 'react-router-dom';

const AboutHero = () => {
  return (
    <section className="bg-gray-100 text-gray-900 py-20 relative overflow-hidden">
      {/* Background decoration (optional) */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-green-500 skew-x-12 opacity-50 pointer-events-none"></div>

      <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center relative z-10">
        
        {/* Left Content */}
        <div className="lg:w-1/2 mb-12 lg:mb-0">
          <div className="inline-block px-3 py-1 bg-[#09a926] text-white rounded-full text-xs font-semibold tracking-wide mb-6">
            FOR EV DRIVERS & BUSINESSES BUILDING SUSTAINABLE MOBILITY
          </div>
          <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight mb-6">
            All your <br />
            EV charging <br />
            needs in <br />
            <span className="bg-white text-[#105136] px-2 transform -rotate-1 inline-block rounded-md">one place</span>
          </h1>
          <p className="text-lg text-green-100 mb-8 max-w-lg">
            Find charging stations across 100+ cities in India. Our comprehensive platform helps you locate chargers, plan routes, and access rental services seamlessly.
          </p>
          <div className="flex gap-4">
            <Link to="/" className="bg-white text-[#105136] px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition">
              Find Charging Stations
            </Link>
            <button className="bg-[#2ebf68] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#25a056] transition">
              Get in Touch
            </button>
          </div>
        </div>

        {/* Right Floating Cards (Visual) */}
        <div className="lg:w-1/2 relative h-[400px]   w-full flex justify-center items-center">
         
       

          {/* Card 2: Stats */}
          <div className="absolute bottom-10 left-10 bg-white text-gray-800 p-4 rounded-xl shadow-2xl w-60 transform -rotate-2 z-20">
             <div className="flex justify-between items-center mb-2">
                <div className="flex gap-1">
                   <div className="w-2 h-2 rounded-full bg-red-400"></div>
                   <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                   <div className="w-2 h-2 rounded-full bg-green-400"></div>
                </div>
                <span className="text-[10px] text-gray-400">Dashboard</span>
             </div>
             <div className="space-y-2">
                <div className="flex justify-between text-sm">
                   <span className="text-gray-500">Total Stations</span>
                   <span className="font-bold text-green-600">15,247</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5">
                   <div className="bg-green-500 h-1.5 rounded-full w-3/4"></div>
                </div>
             </div>
          </div>
          
           {/* Card 3: Farman (UPDATED) */}
           <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-gray-800 p-4 rounded-xl shadow-xl w-64 z-30">
             <div className="flex items-center gap-3 mb-2">
               {/* Updated Initials */}
               <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold">F</div>
               <div>
                 {/* Updated Name */}
                 <p className="font-bold text-sm">Farman</p>
                 <p className="text-xs text-green-600">FOUNDER & CEO</p>
               </div>
             </div>
             <p className="text-xs text-gray-500">🚙 Building India's EV Future</p>
             <div className="mt-3 flex justify-between text-center">
                <div>
                   <p className="font-bold text-sm">100+</p>
                   <p className="text-[10px] text-gray-400">Cities</p>
                </div>
                <div>
                   <p className="font-bold text-sm">2024</p>
                   <p className="text-[10px] text-gray-400">Founded</p>
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutHero;