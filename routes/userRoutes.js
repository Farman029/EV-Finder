const express = require('express');
const router = express.Router();
const { 
  getUserProfile, 
  updateUserProfile, 
  getMyBookings, 
  getMyStations 
} = require('../controllers/userController');

// Middleware to protect routes (ensure user is logged in)
// If you named this file something else (like authMiddleware.js), update the import path
const { protect } = require('../middleware/authMiddleware'); 

// Profile Routes
router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

// Dashboard Routes
router.get('/my-bookings', protect, getMyBookings);
router.get('/my-stations', protect, getMyStations);

module.exports = router;