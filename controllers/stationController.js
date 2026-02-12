
const Station = require('../models/Station');
const Booking = require('../models/Booking'); // Ensure this import exists!
// @desc    Get all stations (Filter by type)
// @route   GET /api/stations
// @access  Public
const getStations = async (req, res) => {
  try {
    const { type } = req.query; // e.g. ?type=EV_CHARGING
    
    let query = {};
    if (type) {
      if (type === 'EV_CHARGING') {
         query.type = { $in: ['EV_CHARGING', 'BOTH'] };
      } 
      else if (type === 'PARKING') {
         query.type = { $in: ['PARKING', 'BOTH'] };
      }
    }

    const stations = await Station.find(query);
    res.json(stations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};




const addStation = async (req, res) => {
  try {
    // ✅ FIX 1: Add 'address' here so we read it from the frontend
    const { name, address, location, type, priceParking, priceCharging, totalSlots } = req.body;

    const newStation = new Station({
      owner: req.user.id,
      name,
      address, // ✅ FIX 2: Pass 'address' to the new Station model
      location,
      type,
      priceParking,
      priceCharging,
      totalSlots,
      isOpen: true
    });

    const station = await newStation.save();
    res.status(201).json(station);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};


const myStations = async (req, res) => {
  try {
    // 1. Force use of .id (which usually maps to the string version of the ObjectId)
    const ownerId = req.user.id; 
    console.log("Fetching stations for owner:", ownerId); // DEBUG LOG

    const stations = await Station.find({ owner: ownerId });
    console.log("Stations found:", stations.length); // DEBUG LOG
    
    const stationIds = stations.map(s => s._id);
    const bookings = await Booking.find({ station: { $in: stationIds } })
                                  .populate('user', 'name email');

    res.json({ stations, bookings });
  } catch (err) {
    console.error("Error in myStations:", err);
    res.status(500).json({ msg: 'Server Error' });
  }
};





const findStations = async (req, res) => {
  try {
    // 1. Destructure both type and search from the URL query
    const { type, search } = req.query; 
    
    let query = {};

    // 2. Existing Type Filter
    if (type) {
      if (type === 'EV_CHARGING') {
         query.type = { $in: ['EV_CHARGING', 'BOTH'] };
      } 
      else if (type === 'PARKING') {
         query.type = { $in: ['PARKING', 'BOTH'] };
      }
    }

    // 3. NEW: Search Filter (Name OR Address)
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },    // 'i' = case insensitive
        { address: { $regex: search, $options: 'i' } }
      ];
    }

    const stations = await Station.find(query);
    res.json(stations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};


const getNearestStations = async (req, res) => {
  // 1. Read 'dist' from the URL (default to 5km if missing)
  const { lat, lng, dist } = req.query; 

  const maxDistanceInMeters = (dist || 5) * 1000; // Convert km to meters

  try {
    const stations = await Station.find({
      location: {
        $near: {
          $geometry: { type: "Point", coordinates: [parseFloat(lng), parseFloat(lat)] },
          $maxDistance: maxDistanceInMeters // ✅ Dynamic Range
        }
      }
    });
    res.json(stations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

















module.exports = {
  getStations,
  addStation,
  myStations,
  getNearestStations ,
  findStations,
};