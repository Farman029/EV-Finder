import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import api from '../api';
import BookingModal from '../components/BookingModal';
import Footer from '../components/Footer'; 
import Spinner from '../components/Spinner'; 

// Import Landing Page Sections
import HeroSection from '../components/Home/HeroSection';
import FeaturesSection from '../components/Home/FeaturesSection';
import HowItWorksSection from '../components/Home/HowItWorksSection';
import TestimonialsSection from '../components/Home/TestimonialsSection';

const Home = () => {
  const [stations, setStations] = useState([]);
  const [filterType, setFilterType] = useState(''); 
  const [selectedStation, setSelectedStation] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [loading, setLoading] = useState(true);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const searchTerm = searchParams.get('search') || ''; 

  // --- 1. Fetch Logic ---
  useEffect(() => {
    // If we are on the landing page (no search, no filter), don't fetch anything
    if (!searchTerm && !filterType) return; 

    if (filterType === 'NEAREST') return;

    const fetchStations = async () => {
      setLoading(true);
      try {
        let url;
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

  // --- 2. Find Nearest Logic ---
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
          const res = await api.get(`/stations/nearest?lat=${latitude}&lng=${longitude}`);
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
        alert("Unable to retrieve your location.");
        setFilterType(''); 
      }
    );
  };

  const clearSearch = (e) => {
    e.preventDefault();
    setFilterType(''); 
    navigate('/'); 
  };

  // ✅ CHECK: Are we in "Search Mode"?
  const isSearchActive = searchTerm || filterType;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      
      {/* ================= CONDITION ================= */}
      {/* IF NOT SEARCHING: Show Landing Page */}
      {!isSearchActive ? (
        <>
          <HeroSection />
          <FeaturesSection />
          <HowItWorksSection />
          <TestimonialsSection />
        </>
      ) : (
        /* IF SEARCHING: Show The Results Grid */
        <div className="container mx-auto px-4 py-8 flex-grow">
            
          {/* Header for Search Results */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">
               {filterType === 'NEAREST' ? '📍 Nearest Stations' : 'Search Results'}
            </h2>
            
            {/* Clear Button */}
            <button 
              onClick={clearSearch} 
              className="mt-2 bg-gray-700  text-white  hover:text-green-300   px-3 py-2 rounded-xl font-bold   border-none cursor-pointer"
            >
              Back to Home
            </button>
          </div>

          {/* Grid or Spinner */}
          {loading ? (
             <Spinner />
          ) : (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {stations.map((station) => (
                 <div key={station._id} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-shadow border border-gray-100 flex flex-col h-full">
                   
                   <div className="flex justify-between items-start mb-2">
                     <h2 className="text-xl font-bold text-gray-800 leading-tight">{station.name}</h2>
                     <span className={`text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wide text-white ml-2 whitespace-nowrap ${
                       station.type === 'EV_CHARGING' ? 'bg-green-500' : 
                       station.type === 'PARKING' ? 'bg-gray-500' : 'bg-blue-500'
                     }`}>
                       {station.type === 'BOTH' ? 'Parking + EV' : station.type.replace('_', ' ')}
                     </span>
                   </div>

                   <p className="text-gray-500 text-sm mb-4">📍 {station.address}</p>

                   <div className="mt-auto bg-gray-50 p-4 rounded-xl">
                      <div className="flex justify-between items-center mb-1">
                         <span className="text-gray-600 text-sm">Parking</span>
                         <span className="font-bold text-gray-800">₹{parseInt(station.priceParking || 0)}/hr</span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                         <span className="text-gray-600 text-sm">EV Charge</span>
                         <span className="font-bold text-gray-800">₹{parseInt(station.priceCharging || 0)}/hr</span>
                      </div>
                   </div>

                   <div className="grid grid-cols-2 gap-3 mt-4">
                     <button 
                       className="bg-blue-600 text-white py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition"
                       onClick={() => setSelectedStation(station)}
                     >
                       Book Slot
                     </button>

                     {station.location && station.location.coordinates && (
                       <a 
                         href={`http://googleusercontent.com/maps.google.com/maps?daddr=${station.location.coordinates[1]},${station.location.coordinates[0]}&api=1`}
                         target="_blank" 
                         rel="noopener noreferrer"
                         className="border-2 border-blue-100 text-blue-600 py-2.5 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-blue-50 transition"
                       >
                         <span>🗺️</span> Direction
                       </a>
                     )}
                   </div>
                 </div>
               ))}

               {stations.length === 0 && !loading && (
                 <div className="col-span-full text-center py-20">
                   <p className="text-gray-500 text-lg">No stations found.</p>
                 </div>
               )}
             </div>
          )}
        </div>
      )}

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

export default Home;