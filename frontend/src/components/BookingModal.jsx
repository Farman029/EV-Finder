import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

// 1. Define slots with a "value" (24h format) for logic, and "label" for display
const PREDEFINED_SLOTS = [
  { value: 9,  label: '09:00 AM - 10:00 AM' },
  { value: 10, label: '10:00 AM - 11:00 AM' },
  { value: 11, label: '11:00 AM - 12:00 PM' },
  { value: 12, label: '12:00 PM - 01:00 PM' },
  { value: 13, label: '01:00 PM - 02:00 PM' },
  { value: 14, label: '02:00 PM - 03:00 PM' },
  { value: 15, label: '03:00 PM - 04:00 PM' },
  { value: 16, label: '04:00 PM - 05:00 PM' },
  { value: 17, label: '05:00 PM - 06:00 PM' },
  { value: 18, label: '06:00 PM - 07:00 PM' },
];

const BookingModal = ({ station, onClose }) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState(''); // Start empty, let the effect fill it
  const [service, setService] = useState('PARKING'); 

  // Calculate 'today' for the min attribute
  const dt = new Date();
  dt.setMinutes(dt.getMinutes() - dt.getTimezoneOffset());
  const todayStr = dt.toISOString().split('T')[0];

  // 2. Logic to filter available slots
  const getAvailableSlots = () => {
    // If no date is selected, show nothing or all (your choice)
    if (!date) return PREDEFINED_SLOTS;

    const selectedDate = new Date(date);
    const currentDate = new Date();

    // Check if the selected date is "Today"
    // We compare date strings to avoid timezone math complexity here
    const isToday = date === todayStr;

    if (isToday) {
      const currentHour = currentDate.getHours();
      // Filter: Only show slots that start AFTER the current hour
      return PREDEFINED_SLOTS.filter(slot => slot.value > currentHour);
    }

    // If it's a future date, return ALL slots
    return PREDEFINED_SLOTS;
  };

  const availableSlots = getAvailableSlots();

  // 3. Auto-select the first valid slot when date changes
  useEffect(() => {
    if (availableSlots.length > 0) {
      // If the currently selected time is NOT in the new list of valid slots, reset it.
      const isValid = availableSlots.find(slot => slot.label === time);
      if (!isValid) {
        setTime(availableSlots[0].label);
      }
    } else {
      setTime(''); // No slots available (e.g., it's 8 PM today)
    }
  }, [date, availableSlots, time]);


  const handleConfirm = async () => {
    try {
      if (!date) return toast.error("Please select a date");
      if (!time) return toast.error("No slots available for this date");

      const token = localStorage.getItem('token');
      if (!token) return toast.error("Please Login to Book!");

      await axios.post(
        'api/bookings/book', 
        {
          stationId: station._id,
          bookingDate: date,
          timeSlot: time,
          serviceType: service
        }, 
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      toast.success('Booking Confirmed!');
      onClose(); 
    } catch (err) {
      console.error("Booking Error:", err);
      toast.error(err.response?.data?.message || 'Booking Failed');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Book: {station.name}</h2>
        
        {/* Date Picker */}
        <label className="block mb-2 font-medium">Select Date:</label>
        <input 
          type="date" 
          className="w-full border p-2 mb-4 rounded" 
          min={todayStr} 
          onChange={(e) => setDate(e.target.value)}
          required
        />

        {/* Time Dropdown - Now Dynamic! */}
        <label className="block mb-2 font-medium">Select Time:</label>
        <select 
          className="w-full border p-2 mb-4 rounded" 
          onChange={(e) => setTime(e.target.value)}
          value={time}
          disabled={!date || availableSlots.length === 0} // Disable if no date or no slots
        >
          {availableSlots.length > 0 ? (
            availableSlots.map((slot) => (
              <option key={slot.value} value={slot.label}>
                {slot.label}
              </option>
            ))
          ) : (
            <option>No slots available today</option>
          )}
        </select>

        {/* Service Type */}
        <label className="block mb-2 font-medium">Service Type:</label>
        <select 
          className="w-full border p-2 mb-4 rounded" 
          onChange={(e) => setService(e.target.value)}
          value={service}
        >
          <option value="PARKING">Parking Only</option>
          <option value="CHARGING">EV Charging</option>
        </select>

        <div className="flex justify-end gap-2 mt-4">
          <button 
            onClick={onClose} 
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button 
            onClick={handleConfirm} 
            disabled={!time} // Prevent clicking if no time selected
            className={`px-4 py-2 rounded text-white ${
              !time ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;