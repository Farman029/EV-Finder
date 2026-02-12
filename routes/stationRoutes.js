const express = require('express');
const router = express.Router();


const Station = require('../models/Station');

// Import the Controller functions
const { getStations, addStation, myStations,getNearestStations ,findStations } = require('../controllers/stationController');

// Import Middleware
const { protect } = require('../middleware/authMiddleware');

// Define Routes
// Correct Order:
router.get('/my-stations', protect, myStations); // Specific route first


// ✅ NEW: Dedicated Search Route
// Endpoint: GET /api/stations/search?search=delhi
router.get('/search', findStations);


// 2. Specific route for the Owner Dashboard
// This will be accessible at: GET /api/stations/my-stations
router.get('/nearest', getNearestStations); // ✅ Much cleaner!

// This handles BOTH GET (view stations) and POST (add station)
router.route('/')
  .get(getStations)            // Public: Anyone can see stations
  .post(protect, addStation);   // Private: Only logged in users can add


















module.exports = router;


// router.route('/').get(getStations).post(protect, addStation); 
// router.get('/:id', getStationById); // Dynamic ID routes last!