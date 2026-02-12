import React from 'react';

const EVBookingCard = ({ booking }) => {
  // 1. Safety Check: Ensure station data exists
  const station = booking.station || {}; 
  
  const handleNavigateClick = () => {
    // ---------------------------------------------------------
    // ✅ FIX FOR GEOJSON: Extract from [Longitude, Latitude] array
    // ---------------------------------------------------------
    const coordinates = station.location?.coordinates;
    let lat, lng;

    if (Array.isArray(coordinates) && coordinates.length === 2) {
      lng = coordinates[0]; // GeoJSON index 0 is Longitude
      lat = coordinates[1]; // GeoJSON index 1 is Latitude
    }

    const stationName = station.name || "EV Station";
    let url = "";

    if (lat && lng) {
      // Google Maps needs "Lat,Lng" order
      const destination = `${lat},${lng}`;
      
      // We pass the destination coordinates AND the station name for a better UI
      url = `https://www.google.com/maps/dir/?api=1&destination=${destination}&destination_place_id=${encodeURIComponent(stationName)}`;
    } else {
      // Fallback: Use the address string if coordinates are broken/missing
      const query = station.address || stationName;
      url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(query)}`;
    }

    // Open in new tab
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Helper to format date nicely
  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString('en-GB', {
      weekday: 'short', day: 'numeric', month: 'short', year: 'numeric'
    });
  };

  return (
    <div className="ev-card border border-gray-200 p-5 rounded-xl shadow-sm bg-white hover:shadow-md transition-all flex flex-col justify-between">
      
      {/* Top Section: Station Info */}
      <div>
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-bold text-lg text-gray-900 leading-tight">
              {station.name || "Unknown Station"}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              {station.address || "Address not available"}
            </p>
          </div>
          {/* Status Badge */}
          <span className={`px-2 py-1 rounded-full text-xs font-semibold 
            ${booking.status === 'Cancelled' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
            {booking.status || 'Active'}
          </span>
        </div>

        <div className="h-px bg-gray-100 my-3"></div>

        {/* Booking Details */}
        <div className="space-y-2 text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <span>📅</span> 
            <span className="font-medium">{formatDate(booking.bookingDate)}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>⏰</span> 
            <span className="font-medium">{booking.timeSlot}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>⚡</span> 
            <span>{booking.serviceType || "Charging"}</span>
          </div>
          {/* Price (Optional - if you want to show cost) */}
           <div className="flex items-center gap-2">
            <span>💰</span> 
            <span>
              {booking.serviceType === 'PARKING' 
                ? `₹${station.priceParking || 0}/hr` 
                : `₹${station.priceCharging || 0}/hr`}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-5 flex gap-3">
        <button 
          onClick={handleNavigateClick}
          className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          <span>📍</span> Navigate
        </button>
        
        {booking.status !== 'Cancelled' && (
          <button 
             className="flex items-center justify-center px-4 py-2 border border-red-200 text-red-600 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors"
             onClick={() => alert(`Cancel booking ID: ${booking._id}`)} 
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
};

export default EVBookingCard;