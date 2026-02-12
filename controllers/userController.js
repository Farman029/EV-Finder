const User = require('../models/User'); // Ensure filename matches (User.js vs userModel.js)
const Booking = require('../models/Booking'); // Ensure filename matches
const Station = require('../models/Station'); // Ensure filename matches

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user.id);
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = async (req, res) => {
  const user = await User.findById(req.user.id);

  if (user) {
    user.name = req.body.name || user.name;
    if (req.body.password) {
      // NOTE: Ensure your User model has a pre-save hook to hash this password!
      user.password = req.body.password;
    }
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

// @desc    Get logged-in user's bookings (Vehicle Owner)
// @route   GET /api/users/my-bookings
// @access  Private
const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate('station', 'name location') 
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookings' });
  }
};

// @desc    Get logged-in user's stations (Station Owner)
// @route   GET /api/users/my-stations
// @access  Private
const getMyStations = async (req, res) => {
  try {
    // Assuming Station model has 'owner' field. If it's 'user', change to: { user: req.user.id }
    const stations = await Station.find({ owner: req.user.id })
      .sort({ createdAt: -1 });
    res.json(stations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching stations' });
  }
};
// ... function codes ...

module.exports = {
  getUserProfile,
  updateUserProfile,
  getMyBookings,
  getMyStations,
};