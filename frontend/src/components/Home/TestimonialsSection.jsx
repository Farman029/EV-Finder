import React from 'react';

const TestimonialsSection = () => {
  return (
    <section className="py-24 bg-white border-t border-gray-100">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-12">Trusted by Teams, Loved by Users</h2>
        
        <div className="max-w-3xl mx-auto bg-white p-10 rounded-3xl shadow-2xl border border-gray-100 relative">
          <div className="text-6xl text-green-200 absolute top-6 left-8 font-serif">"</div>
          <p className="text-xl text-gray-600 italic mb-8 relative z-10">
            "This platform has made my long-distance EV trips so much easier! I can find charging stations along my route and plan stops efficiently. Highly recommended!"
          </p>
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold">
              MG
            </div>
            <div className="text-left">
              <h4 className="font-bold text-gray-900">Megha Garg</h4>
              <p className="text-sm text-gray-500">Tata EV Owner</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;