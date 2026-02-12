const express = require('express');
const router = express.Router();

// Import Controller
const { createBooking, getMyBookings , cancelBooking} = require('../controllers/bookingController');

// Import Middleware CORRECTLY
const { protect } = require('../middleware/authMiddleware'); 

// Define Routes
router.post('/book', protect, createBooking);
router.get('/my-bookings', protect, getMyBookings);
// --- ADD THIS LINE ---
router.put('/cancel/:id', protect, cancelBooking);

module.exports = router;