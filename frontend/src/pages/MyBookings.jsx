import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Bookings
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log(` the toke is ${token}`);
        // if (!token) return;
   
        // Make sure this URL matches your backend port (usually 5000)
        const res = await axios.get('http://localhost:5000/api/bookings/my-bookings', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setBookings(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // --- CANCEL LOGIC (With Custom Toast) ---
  const handleCancel = (bookingId) => {
    toast.custom((t) => (
      <div className={`${
        t.visible ? 'animate-enter' : 'animate-leave'
      } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 p-4`}>
        <div className="flex-1 w-0 p-1">
          <div className="flex items-start">
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-900">
                Cancel Booking?
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Are you sure you want to cancel this reservation?
              </p>
            </div>
          </div>
        </div>
        <div className="flex border-l border-gray-200 ml-4 pl-4 gap-2">
          {/* YES Button */}
          <button
            onClick={async () => {
              toast.dismiss(t.id);
              try {
                const token = localStorage.getItem('token');
                await axios.put(`http://localhost:5000/api/bookings/cancel/${bookingId}`, {}, {
                  headers: { Authorization: `Bearer ${token}` }
                });

                toast.success("Booking Cancelled");
                // Remove the booking from the list immediately (Optimistic UI)
                setBookings((prev) => prev.filter((b) => b._id !== bookingId));
              } catch (err) {
                console.error(err);
                toast.error(err.response?.data?.msg || "Cancellation Failed");
              }
            }}
            className="w-full border border-transparent rounded-none rounded-r-lg p-2 flex items-center justify-center text-sm font-medium text-red-600 hover:text-red-500 focus:outline-none"
          >
            Yes
          </button>
          
          {/* NO Button */}
          <button
            onClick={() => toast.dismiss(t.id)}
            className="w-full border border-transparent rounded-none p-2 flex items-center justify-center text-sm font-medium text-gray-600 hover:text-gray-500 focus:outline-none"
          >
            No
          </button>
        </div>
      </div>
    ), { duration: 5000 });
  };

  if (loading) return <div className="p-4 text-center">Loading your bookings...</div>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">My Bookings</h2>

      {bookings.length === 0 ? (
        <p className="text-gray-500">No active bookings found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded shadow-sm">
            <thead>
              <tr className="bg-gray-100 text-left text-sm uppercase text-gray-600">
                <th className="py-3 px-4 border-b">Station</th>
                <th className="py-3 px-4 border-b">Date</th>
                <th className="py-3 px-4 border-b">Time</th>
                <th className="py-3 px-4 border-b">Service</th>
                <th className="py-3 px-4 border-b text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => {
                // Check if the booking is in the past to disable cancellation
                const bookingDate = new Date(booking.bookingDate);
                const isPast = bookingDate < new Date().setHours(0, 0, 0, 0);

                return (
                  <tr key={booking._id} className="hover:bg-gray-50 border-b last:border-0">
                    <td className="py-3 px-4">
                      {/* Safety Check: Use ?.name in case station was deleted */}
                      <div className="font-bold">{booking.station?.name || "Unknown Station"}</div>
                      
                      {/* ✅ FIX: Display Address String, NOT Location Object */}
                      <p className="text-gray-600 text-sm mt-1">
                        {booking.station?.address || "Address unavailable"}
                      </p>
                    </td>
                    <td className="py-3 px-4">
                      {new Date(booking.bookingDate).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 text-sm font-mono">{booking.timeSlot}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                        booking.serviceType === 'CHARGING' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        {booking.serviceType}
                      </span>
                    </td>
                    
                    {/* ACTION COLUMN */}
                    <td className="py-3 px-4 text-right">
                      {!isPast && booking.status !== 'Cancelled' ? (
                        <button 
                          onClick={() => handleCancel(booking._id)}
                          className="text-red-500 hover:text-red-700 text-sm font-semibold border border-red-200 hover:bg-red-50 px-3 py-1 rounded transition"
                        >
                          Cancel
                        </button>
                      ) : (
                        <span className="text-gray-400 text-xs italic bg-gray-100 px-2 py-1 rounded">
                          {booking.status === 'Cancelled' ? 'Cancelled' : 'Completed'}
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyBookings;