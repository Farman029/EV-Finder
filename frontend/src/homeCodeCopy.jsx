import { useEffect, useState } from 'react';
import api from '../api';
import BookingModal from '../components/BookingModal';
import Footer from '../components/Footer'; 

const Home = () => {
  const [stations, setStations] = useState([]);
  const [filterType, setFilterType] = useState(''); 
  const [selectedStation, setSelectedStation] = useState(null);

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const res = await api.get(`/stations?type=${filterType}`);
        setStations(res.data);
      } catch (err) {
        console.error("Error fetching stations:", err);
      }
    };
    fetchStations();
  }, [filterType]);

  return (
    <div className="min-h-screen bg-[#F5F5DC] flex flex-col">


      
      
{/* 
      <div className="text-center py-10 px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Find Nearby Stations</h1>
        
        <div className="flex flex-wrap justify-center gap-3">
          <button 
            onClick={() => setFilterType('')}
            className={`px-5 py-2 rounded-full font-medium transition-all ${filterType === '' ? 'bg-blue-600 text-white shadow-lg' : 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-50'}`}
          >
            Show All
          </button>
          <button 
            onClick={() => setFilterType('EV_CHARGING')}
            className={`px-5 py-2 rounded-full font-medium transition-all ${filterType === 'EV_CHARGING' ? 'bg-green-600 text-white shadow-lg' : 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-50'}`}
          >
            EV Charging Only
          </button>
          <button 
            onClick={() => setFilterType('PARKING')}
            className={`px-5 py-2 rounded-full font-medium transition-all ${filterType === 'PARKING' ? 'bg-gray-600 text-white shadow-lg' : 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-50'}`}
          >
            Parking Only
          </button>
        </div>
      </div> */}

      
      {/* //  2. Stations Grid  */}


     <div className="container mx-auto px-4 pb-12 flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stations.map((station) => (
            <div key={station._id} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-shadow border border-gray-100 flex flex-col h-full">
              
              {/* * Card Header * */}
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-xl font-bold text-gray-800 leading-tight">{station.name}</h2>
                <span className={`text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wide text-white ml-2 whitespace-nowrap ${
                  station.type === 'EV_CHARGING' ? 'bg-green-500' : 
                  station.type === 'PARKING' ? 'bg-gray-500' : 'bg-blue-500'
                }`}>
                  {station.type === 'BOTH' ? 'Parking + EV' : station.type.replace('_', ' ')}
                </span>
              </div>

              {/* Location Info */}
              <p className="text-gray-500 text-sm mb-4 flex items-start gap-1">
                <span>📍</span> {station.address}
              </p>

              {/* Pricing & Info */}
              <div className="mt-auto bg-gray-50 p-4 rounded-xl">
                <div className="flex justify-between items-center mb-1">
                   <span className="text-gray-600 text-sm">Parking</span>
                   <span className="font-bold text-gray-800">₹{parseInt(station.priceParking || 0)}/hr</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                   <span className="text-gray-600 text-sm">EV Charge</span>
                   <span className="font-bold text-gray-800">₹{parseInt(station.priceCharging || 0)}/hr</span>
                </div>
                <div className="text-xs text-gray-400 pt-2 border-t border-gray-200">
                  {station.totalSlots} Slots Available
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 mt-4">
                <button 
                  className="bg-blue-600 text-white py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition active:scale-95"
                  onClick={() => setSelectedStation(station)}
                >
                  Book Slot
                </button>

                {/* GOOGLE MAPS DIRECTION BUTTON */}
                {station.location && station.location.coordinates && (
                  <a 
                    /* Logic: MongoDB stores [Lng, Lat] (GeoJSON format).
                       Google Maps expects destination=Lat,Lng.
                       So we use coordinates[1] first, then coordinates[0].
                    */
                    href={`https://www.google.com/maps/dir/?api=1&destination=${station.location.coordinates[1]},${station.location.coordinates[0]}`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="border-2 border-blue-100 text-blue-600 py-2.5 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-blue-50 transition active:scale-95"
                  >
                    <span>🗺️</span> Direction
                  </a>
                )}
              </div>
            </div>
          ))}

          {/* Empty State */}
          {stations.length === 0 && (
            <div className="col-span-full text-center py-20">
              <p className="text-gray-400 text-lg">No stations found matching your criteria.</p>
              <button onClick={() => setFilterType('')} className="text-blue-500 mt-2 underline">Clear Filters</button>
            </div>
          )}
        </div>

        {selectedStation && (
          <BookingModal 
            station={selectedStation} 
            onClose={() => setSelectedStation(null)} 
          />
        )}
      </div>  
  

      <Footer />
    </div>
  );
};

export default Home;

           style={{ backgroundImage: 'radial-gradient(#166534 1px, transparent 1px)', backgroundSize: '32px 32px' }}>