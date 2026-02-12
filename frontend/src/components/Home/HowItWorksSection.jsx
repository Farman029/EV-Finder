import React from 'react';
import { Link } from 'react-router-dom';

const HowItWorksSection = () => {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
        <p className="text-gray-500 mb-16">Get started in 3 easy steps.</p>

        <div className="flex flex-col md:flex-row justify-center items-center gap-12 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-20 right-20 h-1 bg-green-100 -z-10 rounded-full"></div>

          {/* Steps */}
          {[
            { id: 1, title: 'Search', desc: 'Enter your location to find nearby stations instantly.', color: 'bg-green-600' },
            { id: 2, title: 'Book Slot', desc: 'Reserve your charging spot in advance to save time.', color: 'bg-green-500' },
            { id: 3, title: 'Charge & Go', desc: 'Navigate to the station, charge up, and enjoy your drive.', color: 'bg-emerald-500' }
          ].map((step) => (
            <div key={step.id} className="flex flex-col items-center bg-white p-6 rounded-2xl shadow-sm md:bg-transparent md:shadow-none z-10">
              <div className={`w-20 h-20 ${step.color} text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-lg mb-6 border-4 border-white`}>
                {step.id}
              </div>
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-gray-500 max-w-xs">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <Link  className="inline-block px-8 py-4 bg-green-600 text-white rounded-full font-bold text-lg hover:bg-green-700 transition shadow-xl">
             Get Started Today
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;