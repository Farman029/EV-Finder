import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import api from '../api';
import BookingModal from '../components/BookingModal';
import Footer from '../components/Footer'; 
import Spinner from '../components/Spinner';

const AllStation = () => {
  const [stations, setStations] = useState([]);
  const [filterType, setFilterType] = useState(''); 
  const [selectedStation, setSelectedStation] = useState(null);
  
  // Loading States
  const [loading, setLoading] = useState(true);
  const [loadingLocation, setLoadingLocation] = useState(false);

  // Router Hooks
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const searchTerm = searchParams.get('search') || ''; 

  // State for Search Radius (Default 5km)
  const [searchRadius, setSearchRadius] = useState(5);

  // 1. Fetch Logic
  useEffect(() => {
    // If filtering by NEAREST, let the manual handler do the work
    if (filterType === 'NEAREST') return;

    const fetchStations = async () => {
      setLoading(true);
      try {
        let url;
        // logic: If searching, use search endpoint. If not, use standard endpoint.
        if (searchTerm) {
           url = `/stations/search?search=${searchTerm}&type=${filterType}`;
        } else {
           url = `/stations?type=${filterType}`;
        }

        const res = await api.get(url);
        setStations(res.data);
      } catch (err) {
        console.error("Error fetching stations:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStations();
  }, [filterType, searchTerm]); 


  // 2. Find Nearest Logic
  const handleFindNearest = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setLoadingLocation(true);
    setLoading(true);
    setFilterType('NEAREST'); 

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          // Pass the dynamic 'dist' (radius) to the backend
          const res = await api.get(`/stations/nearest?lat=${latitude}&lng=${longitude}&dist=${searchRadius}`);
          setStations(res.data);
        } catch (err) {
          console.error(err);
          alert("Error finding nearby stations");
        } finally {
          setLoadingLocation(false);
          setLoading(false);
        }
      },
      (error) => {
        setLoadingLocation(false);
        setLoading(false);
        alert("Unable to retrieve your location. Please check browser permissions.");
        setFilterType(''); 
      }
    );
  };

  const clearSearch = () => {
    setFilterType('');
    navigate('/all-stations'); 
  };

  return (
    <div className="min-h-screen bg-[#F5F5DC] flex flex-col">
      
      {/* Search Result Feedback */}
      {searchTerm && (
        <div className="text-center pt-6 flex flex-col items-center gap-2">
          <p className="text-gray-600 text-lg">
            Results for: <span className="font-bold text-gray-900">"{searchTerm}"</span>
          </p>
          <button 
            onClick={clearSearch} 
            className="text-sm text-red-500 underline hover:text-red-700 bg-transparent border-none cursor-pointer"
          >
            Clear Search
          </button>
        </div>
      )}

      {/* Header & Filters */}
      <div className="text-center py-10 px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Find Nearby Stations</h1>
        
        <div className="flex flex-wrap justify-center items-center gap-3">
          
          {/* RANGE SELECTOR GROUP */}
          <div className="flex bg-white rounded-full p-1 shadow-md border border-gray-200">
             <select 
               value={searchRadius}
               onChange={(e) => setSearchRadius(Number(e.target.value))}
               className="bg-transparent pl-4 pr-2 py-2 text-gray-700 font-medium outline-none cursor-pointer border-r border-gray-200"
             >
               <option value={2}>2 km</option>
               <option value={5}>5 km</option>
               <option value={10}>10 km</option>
               <option value={20}>20 km</option>
             </select>
             <button 
               onClick={handleFindNearest}
               className={`px-5 py-2 rounded-full hover:shadow-2xl font-medium transition-all flex items-center gap-2 ${filterType === 'NEAREST' ? 'bg-red-500 text-white' : 'hover:bg-gray-100 text-red-500'}`}
             >
               {loadingLocation ? 'Locating...' : '📍 Find Nearest'}
             </button>
          </div>

          <div className="w-full md:w-auto h-0 md:h-8 border-l border-gray-300 mx-2 hidden md:block"></div>

          {/* STANDARD FILTERS */}
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
            EV Charging
          </button>
          <button 
            onClick={() => setFilterType('PARKING')}
            className={`px-5 py-2 rounded-full font-medium transition-all ${filterType === 'PARKING' ? 'bg-gray-600 text-white shadow-lg' : 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-50'}`}
          >
            Parking
          </button>
        </div>
      </div>

      {/* Stations Grid */}
      <div className="container mx-auto px-4 pb-12 flex-grow">
        
        {loading ? (
          <Spinner />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stations.map((station) => (
              <div key={station._id} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-shadow border border-gray-100 flex flex-col h-full">
                
                {/* Card Header */}
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

                {/* Pricing */}
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

                  {/* ✅ FIXED: Standard Google Maps Link */}
                  {station.location && station.location.coordinates && (
                    <a 
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
            {!loading && stations.length === 0 && (
              <div className="col-span-full text-center py-20">
                <p className="text-gray-400 text-lg">
                  {filterType === 'NEAREST' ? `No stations found within ${searchRadius}km.` : "No stations found."}
                </p>
                <button onClick={() => setFilterType('')} className="text-blue-500 mt-2 underline bg-transparent border-none cursor-pointer">
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {selectedStation && (
        <BookingModal 
          station={selectedStation} 
          onClose={() => setSelectedStation(null)} 
        />
      )}

      <Footer />
    </div>
  );
};

export default AllStation;