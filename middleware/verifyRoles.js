// @desc    Check if user is a STATION_OWNER
// @usage   Use after 'protect': router.post('/', protect, verifyStationOwner, ...)
const verifyStationOwner = (req, res, next) => {
  // req.user is already loaded by 'protect' middleware
  if (req.user && req.user.role === 'STATION_OWNER') {
    next(); 
  } else {
    res.status(403).json({ message: 'Access denied. Station Owners only.' });
  }
};

module.exports = { verifyStationOwner };