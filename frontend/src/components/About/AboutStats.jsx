import React from 'react';

const AboutStats = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Our Impact on India's EV Journey</h2>
        <p className="text-gray-500 mb-12">Leading the charge in India's electric revolution with measurable impact.</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="p-6 bg-gray-50 rounded-xl">
            <div className="text-4xl font-bold text-green-600 mb-2">50,000+</div>
            <div className="font-bold text-gray-800">EV Drivers Served</div>
            <div className="text-xs text-gray-500 mt-1">Growing monthly</div>
          </div>
          <div className="p-6 bg-gray-50 rounded-xl">
            <div className="text-4xl font-bold text-green-600 mb-2">15,000+</div>
            <div className="font-bold text-gray-800">Charging Stations</div>
            <div className="text-xs text-gray-500 mt-1">Verified & mapped</div>
          </div>
          <div className="p-6 bg-gray-50 rounded-xl">
            <div className="text-4xl font-bold text-green-600 mb-2">100+</div>
            <div className="font-bold text-gray-800">Cities Covered</div>
            <div className="text-xs text-gray-500 mt-1">Nationwide reach</div>
          </div>
          <div className="p-6 bg-gray-50 rounded-xl">
            <div className="text-4xl font-bold text-green-600 mb-2">24/7</div>
            <div className="font-bold text-gray-800">Support Available</div>
            <div className="text-xs text-gray-500 mt-1">Always here to help</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutStats;