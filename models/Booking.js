const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  station: { type: mongoose.Schema.Types.ObjectId, ref: 'Station', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  
  bookingDate: { type: Date, required: true }, 
  timeSlot: { type: String, required: true },  
  
  serviceType: { 
    type: String, 
    enum: ['PARKING', 'CHARGING'], 
    required: true 
  },

  status: { 
    type: String, 
    // --- FIX HERE ---
    // We allow 'Cancelled' (what the controller sends) AND 'CANCELLED' (for safety)
    enum: ['Confirmed', 'Cancelled', 'CONFIRMED', 'CANCELLED'], 
    default: 'Confirmed' 
    // ----------------
  },
  
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', BookingSchema);