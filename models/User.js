const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'], // No empty fields
    trim: true,
    minlength: [2, 'Name must be at least 2 characters long'], // Greater than 1
    maxlength: [3000, 'Name cannot exceed 3000 characters']       // Less than 3000
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Password is required'], // No empty fields
    minlength: [8, 'Password must be at least 8 characters long'], // Greater than 7
     maxlength: [3000, 'Name cannot exceed 3000 characters']      // Less than 50
  },
  role: {
    type: String,
    enum: ['VEHICLE_OWNER', 'STATION_OWNER'],
    default: 'VEHICLE_OWNER'
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
// const UserSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true ,minlength: [8, 'Password must be at least 8 characters long']},
//   // Role tells us if they are a "Vehicle Owner" or "Station Owner"
//   role: { 
//     type: String, 
//     enum: ['VEHICLE_OWNER', 'STATION_OWNER'], 
//     default: 'VEHICLE_OWNER' 
//   },
  
//   createdAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('User', UserSchema);