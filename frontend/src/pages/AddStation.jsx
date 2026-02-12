import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api'; 
import toast from 'react-hot-toast';

const AddStation = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isDetecting, setIsDetecting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    address: '',      // Text address
    lat: '',          // Numerical latitude
    lng: '',          // Numerical longitude
    type: 'BOTH',
    priceParking: 0,
    priceCharging: 0,
    totalSlots: 5
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- NEW: GEOLOCATION LOGIC ---
  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      return toast.error("Geolocation is not supported by your browser");
    }

    setIsDetecting(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setFormData((prev) => ({
          ...prev,
          lat: position.coords.latitude.toFixed(6),
          lng: position.coords.longitude.toFixed(6)
        }));
        setIsDetecting(false);
        toast.success("Location coordinates updated!");
      },
      (error) => {
        setIsDetecting(false);
        toast.error("Permission denied. Please allow location access.");
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      
      // ✅ MUST RESTRUCTURE FOR BACKEND (GEOJSON)
    
      const stationData = {
  name: formData.name,
  address: formData.address, // ✅ Correct: At the root level
  type: formData.type,
  priceParking: Number(formData.priceParking),
  priceCharging: Number(formData.priceCharging),
  totalSlots: Number(formData.totalSlots),
  location: {
    type: "Point",
    coordinates: [parseFloat(formData.lng), parseFloat(formData.lat)] // ✅ Correct: Only coordinates here
  }
};


console.log("SENDING DATA:", stationData);  // <--- LOOK AT THIS IN CONSOLE



      await api.post('/stations', stationData, {
        headers: { Authorization: `Bearer ${token}` } 
      });

      toast.success('Station Added Successfully!');
      navigate('/'); 
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Error adding station';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-md mx-auto bg-white p-8 rounded shadow-lg border-t-4 border-blue-600">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Add New Station</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div>
            <label className="block text-gray-700 font-semibold">Station Name</label>
            <input type="text" name="name" onChange={handleChange} required 
              className="w-full p-2 border rounded mt-1 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. Rohini Charging Hub" />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold">Full Address</label>

            <input type="text" name="address" onChange={handleChange} required 
              className="w-full p-2 border rounded mt-1 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Street name, Sector, City" />
          </div>

          {/* 📍 GEOLOCATION SECTION */}
          <div className="bg-blue-50 p-4 rounded-md border border-blue-100">
            <button
              type="button"
              onClick={handleDetectLocation}
              className="w-full bg-blue-500 text-white py-2 rounded font-medium hover:bg-blue-600 transition flex items-center justify-center gap-2"
            >
              {isDetecting ? "Detecting..." : "📍 Get Current Location"}
            </button>
            
            <div className="grid grid-cols-2 gap-2 mt-3">
              <input 
                type="number" step="any" name="lat" value={formData.lat} onChange={handleChange}
                placeholder="Lat" className="p-2 border rounded bg-white text-sm" required 
              />
              <input 
                type="number" step="any" name="lng" value={formData.lng} onChange={handleChange}
                placeholder="Lng" className="p-2 border rounded bg-white text-sm" required 
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold">Station Type</label>
            <select name="type" onChange={handleChange} className="w-full p-2 border rounded mt-1 bg-white focus:ring-2 focus:ring-blue-500">
              <option value="BOTH">Both (Parking + EV)</option>
              <option value="EV_CHARGING">EV Charging Only</option>
              <option value="PARKING">Parking Only</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 text-sm">Parking Price (/hr)</label>
              <input type="number" name="priceParking" onChange={handleChange} 
                className="w-full p-2 border rounded mt-1" />
            </div>
            <div>
              <label className="block text-gray-700 text-sm">EV Price (/hr)</label>
              <input type="number" name="priceCharging" onChange={handleChange} 
                className="w-full p-2 border rounded mt-1" />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold">Total Slots</label>
            <input type="number" name="totalSlots" value={formData.totalSlots} onChange={handleChange} required 
              className="w-full p-2 border rounded mt-1" />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className={`w-full py-3 rounded text-white font-bold text-lg shadow-md transition ${loading ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'}`}
          >
            {loading ? 'Processing...' : 'Create Station'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddStation;