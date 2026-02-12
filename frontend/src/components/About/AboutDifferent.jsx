import React from 'react';

const features = [
  {
    title: "Extensive Coverage",
    icon: "📍",
    color: "bg-green-600",
    points: ["Tesla Superchargers on highways", "CCS fast chargers in cities", "Level 2 for daily charging"]
  },
  {
    title: "Real-Time Updates",
    icon: "🕒",
    color: "bg-blue-600",
    points: ["Live availability status", "Pricing information", "Instant notifications"]
  },
  {
    title: "Smart Planning",
    icon: "🚗",
    color: "bg-purple-600",
    points: ["Intelligent route optimization", "Battery range calculations", "Emergency alerts"]
  },
  {
    title: "Trusted Network",
    icon: "🛡️",
    color: "bg-indigo-600",
    points: ["Verified charging stations", "User reviews & ratings", "24/7 customer support"]
  },
  {
    title: "Growing Network",
    icon: "📈",
    color: "bg-teal-600",
    points: ["100+ cities covered", "15,000+ stations mapped", "Daily network expansion"]
  },
  {
    title: "Rental Services",
    icon: "🍃",
    color: "bg-emerald-600",
    points: ["EV charger rental options", "Flexible booking system", "Home & office installation"]
  }
];

const AboutDifferent = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">What Makes Us Different</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            We offer comprehensive access to India's EV charging infrastructure with smart features that make every journey worry-free.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition border border-gray-100">
              <div className={`w-12 h-12 ${feature.color} text-white rounded-lg flex items-center justify-center text-2xl mb-6`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">{feature.title}</h3>
              <ul className="space-y-2">
                {feature.points.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-500">
                    <span className="text-green-500 mt-1">•</span> {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutDifferent;