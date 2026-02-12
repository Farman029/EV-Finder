const mongoose = require('mongoose');

const StationSchema = new mongoose.Schema({
  owner: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  
  name: { 
    type: String, 
    required: true,
    trim: true
  },

  // ✅ FIX: Moved Address OUTSIDE of the location object
  address: { 
    type: String, 
    required: true 
  },

  // ✅ Location contains ONLY GeoJSON data
  location: {
    type: { 
      type: String, 
      enum: ['Point'], 
      default: 'Point' 
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true,
      validate: {
        validator: function(v) {
          return v.length === 2 && 
                 typeof v[0] === 'number' && 
                 typeof v[1] === 'number';
        },
        message: 'Coordinates must be an array of two numbers: [longitude, latitude]'
      }
    }
  },

  type: { 
    type: String, 
    enum: ['PARKING', 'EV_CHARGING', 'BOTH'], 
    required: true 
  },

  priceParking: { type: Number, default: 0 }, 
  priceCharging: { type: Number, default: 0 }, 
  totalSlots: { type: Number, required: true, default: 1 },
  
  createdAt: { type: Date, default: Date.now }
});

// IMPORTANT: Enable the 2dsphere index for geo-queries
StationSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Station', StationSchema);