import { useEffect, useState } from 'react';
import axios from 'axios';

const DashboardHistory = ({ role }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Only fetch if we have a valid role
    if (!role) return;

    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        
        // Dynamic Endpoint based on Role
        // STATION_OWNER -> See their stations
        // VEHICLE_OWNER -> See their bookings
        const endpoint = role === 'STATION_OWNER' 
          ? 'http://localhost:5000/api/users/my-stations' 
          : 'http://localhost:5000/api/users/my-bookings';

        console.log(`Fetching dashboard data from: ${endpoint}`);

        const { data } = await axios.get(endpoint, config);
        setData(data);
        setLoading(false);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
        setError('Could not load history');
        setLoading(false);
      }
    };

    fetchData();
  }, [role]);

  if (loading) return <div className="text-center py-4 text-gray-500">Loading your history...</div>;
  
  if (error) return <div className="text-center py-4 text-red-500">{error}</div>;

  if (data.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-md border border-dashed border-gray-300">
        <p>No records found.</p>
        {role === 'STATION_OWNER' ? (
          <p className="text-sm mt-1">You haven't added any stations yet.</p>
        ) : (
          <p className="text-sm mt-1">You haven't made any bookings yet.</p>
        )}
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold mb-4 text-gray-800">
        {role === 'STATION_OWNER' ? 'My Charging Stations' : 'My Booking History'}
      </h3>
      
      <div className="overflow-x-auto shadow-sm rounded-lg border border-gray-200">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-50">
            <tr>
              {/* Dynamic Headers */}
              <th className="py-3 px-4 border-b text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                {role === 'STATION_OWNER' ? 'Station Name' : 'Station'}
              </th>
              <th className="py-3 px-4 border-b text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Date
              </th>
              <th className="py-3 px-4 border-b text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th>
              <th className="py-3 px-4 border-b text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                {role === 'STATION_OWNER' ? 'Rate' : 'Amount'}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map((item) => (
              <tr key={item._id} className="hover:bg-gray-50 transition-colors">
                
                {/* === STATION OWNER VIEW === */}
                {role === 'STATION_OWNER' ? (
                  <>
                    <td className="py-3 px-4 text-sm font-medium text-gray-900">{item.name}</td>
                    <td className="py-3 px-4 text-sm text-gray-500">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 text-sm">
                      <span className={`px-2 py-1 text-xs rounded-full font-semibold ${
                        item.isOpen 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {item.isOpen ? 'Active' : 'Closed'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-700">₹{item.pricePerHour}/hr</td>
                  </>
                ) : (
                  /* === VEHICLE OWNER VIEW === */
                  <>
                    <td className="py-3 px-4 text-sm font-medium text-gray-900">
                      {/* Handle case where station might have been deleted */}
                      {item.station ? item.station.name : <span className="text-red-400">Station Removed</span>}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-500">
                      {item.startTime ? new Date(item.startTime).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="py-3 px-4 text-sm">
                       <span className={`px-2 py-1 text-xs rounded-full font-semibold ${
                        item.status === 'completed' ? 'bg-green-100 text-green-800' : 
                        item.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-gray-100 text-gray-800'
                       }`}>
                        {item.status || 'Pending'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm font-bold text-gray-700">
                      ₹{item.totalAmount}
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardHistory;