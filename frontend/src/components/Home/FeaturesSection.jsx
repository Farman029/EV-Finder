import React from 'react';

const FeaturesSection = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Choose <span className="text-green-600">EV Station</span>?
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Our platform offers comprehensive features to make your EV journey seamless and worry-free.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="p-8 border border-gray-100 rounded-3xl shadow-lg hover:shadow-xl transition bg-white group">
            <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition">⚡</div>
            <h3 className="text-xl font-bold mb-3 text-gray-800">Lightning Fast</h3>
            <p className="text-gray-500 leading-relaxed">Find charging stations in under 3 minutes with our advanced search algorithm.</p>
          </div>

          {/* Feature 2 */}
          <div className="p-8 border border-green-100 rounded-3xl shadow-xl bg-gradient-to-br from-green-50 to-white relative overflow-hidden">
             <div className="absolute top-0 right-0 w-24 h-24 bg-green-100 rounded-bl-full -mr-4 -mt-4 opacity-50"></div>
            <div className="w-14 h-14 bg-green-600 text-white rounded-full flex items-center justify-center text-3xl mb-6 shadow-lg">📱</div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">Smart Integration</h3>
            <p className="text-gray-600 leading-relaxed">Seamlessly integrate with your phone's GPS for turn-by-turn navigation.</p>
          </div>

          {/* Feature 3 */}
          <div className="p-8 border border-gray-100 rounded-3xl shadow-lg hover:shadow-xl transition bg-white group">
            <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition">🛡️</div>
            <h3 className="text-xl font-bold mb-3 text-gray-800">Verified Data</h3>
            <p className="text-gray-500 leading-relaxed">Real-time updates and verified information from our network of trusted partners.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;