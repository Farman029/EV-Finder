import { useEffect, useState } from 'react';
import api from '../api';
import toast from 'react-hot-toast';

const OwnerDashboard = () => {
  const [data, setData] = useState({ stations: [], bookings: [] });
  const [loading, setLoading] = useState(true);




useEffect(() => {
    const fetchOwnerData = async () => {
      try {
        const res = await api.get('/stations/my-stations', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}` 
          }
        });

        // console.log("Backend Response:", res.data); // <--- Debugging line

        // SAFE GUARD: Check if backend sent an Array (Stations only) or an Object
        if (Array.isArray(res.data)) {
            // Backend only returned stations, so we initialize bookings as empty
            setData({ 
                stations: res.data, 
                bookings: [] 
            });
        } else {
            // Backend returned { stations, bookings } structure
            setData({
                stations: res.data.stations || [],
                bookings: res.data.bookings || []
            });
        }

      } catch (err) {
        console.error(err);
        toast.error('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };
    fetchOwnerData();
  }, []);


  if (loading) return <p className="text-center mt-10 text-gray-500">Loading Dashboard...</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Owner Dashboard</h1>

      {data.stations.length === 0 ? (
        <div className="bg-white p-8 rounded shadow text-center">
            <p className="text-gray-500">You haven't added any stations yet.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {data.stations.map((station) => (
            <div key={station._id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
              
              {/* Station Info Header */}
              <div className="bg-blue-600 p-4 text-white flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold">{station.name}</h2>
                  {/* ✅ FIX 1: Use address, not location object */}
                  <p className="text-sm opacity-90 flex items-center gap-1">
                    📍 {station.address}
                  </p>
                </div>
                <div className="text-right">
                    <span className="bg-white text-blue-600 px-3 py-1 rounded-full text-xs font-bold uppercase block">
                    {station.type}
                    </span>
                    <span className="text-xs mt-1 block opacity-80">
                        {station.totalSlots} Slots
                    </span>
                </div>
              </div>

              {/* Bookings for THIS station */}
              <div className="p-6">
                <h3 className="font-semibold text-gray-700 mb-4 border-b pb-2">Recent Bookings:</h3>
                
                {data.bookings.filter(b => b.station === station._id).length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b text-gray-500 text-sm bg-gray-50">
                          <th className="py-2 px-3">Customer</th>
                          <th className="py-2 px-3">Date</th>
                          <th className="py-2 px-3">Time Slot</th>
                          <th className="py-2 px-3">Service</th>
                          <th className="py-2 px-3">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.bookings
                          .filter(b => b.station === station._id)
                          .map((booking) => (
                            <tr key={booking._id} className="border-b last:border-0 hover:bg-gray-50 transition">
                              <td className="py-3 px-3">
                                {/* ✅ FIX 2: Safety check for user */}
                                <p className="font-medium text-gray-800">{booking.user?.name || 'Unknown'}</p>
                                <p className="text-xs text-gray-500">{booking.user?.email}</p>
                              </td>
                              
                              {/* ✅ FIX 3: Use bookingDate (from Schema) */}
                              <td className="py-3 px-3 text-sm text-gray-600">
                                {new Date(booking.bookingDate).toLocaleDateString()}
                              </td>
                              
                              {/* ✅ FIX 4: Use timeSlot (from Schema) */}
                              <td className="py-3 px-3 text-sm font-mono text-blue-600">
                                {booking.timeSlot}
                              </td>

                              <td className="py-3 px-3 text-sm">
                                {booking.serviceType}
                              </td>

                              <td className="py-3 px-3">
                                <span className={`px-2 py-1 rounded-md text-xs font-bold ${
                                    booking.status === 'Cancelled' 
                                    ? 'bg-red-100 text-red-700' 
                                    : 'bg-green-100 text-green-700'
                                }`}>
                                  {booking.status || 'Confirmed'}
                                </span>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-gray-400 text-sm italic py-4 text-center bg-gray-50 rounded">
                    No bookings yet for this station.
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OwnerDashboard;