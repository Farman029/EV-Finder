import React from 'react';

const AboutMission = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
        
        {/* Text Content */}
        <div className="md:w-1/2">
          <div className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold mb-4">
            Our Mission
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Accelerating India's Electric Future
          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Chargeway is dedicated to accelerating India's transition to sustainable transportation by making electric vehicle charging accessible, reliable, and user-friendly. We believe widespread adoption is crucial for a cleaner future.
          </p>

          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="mt-1 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-xs">✓</div>
              <div>
                <h4 className="font-bold text-gray-800">Comprehensive Network</h4>
                <p className="text-sm text-gray-500">Access to 15,000+ stations across highways and cities.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="mt-1 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-xs">✓</div>
              <div>
                <h4 className="font-bold text-gray-800">Real-Time Intelligence</h4>
                <p className="text-sm text-gray-500">Live availability tracking and intelligent route planning.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="mt-1 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-xs">✓</div>
              <div>
                <h4 className="font-bold text-gray-800">Universal Compatibility</h4>
                <p className="text-sm text-gray-500">Support for all connector types including CCS, CHAdeMO.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Image Placeholder */}
        <div className="md:w-1/2">
          <div className="bg-gray-900 rounded-2xl p-8 shadow-2xl relative overflow-hidden h-[400px] flex items-center justify-center text-white">
             {/* Abstract car graphic placeholder */}
             <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-black"></div>
             <div className="relative z-10 text-center">
                <span className="text-6xl">🚗⚡</span>
                <p className="mt-4 font-mono text-green-400">System Online</p>
                <div className="mt-2 flex gap-2 justify-center">
                   <span className="w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
                   <span className="text-xs">Live Tracking Active</span>
                </div>
             </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutMission;