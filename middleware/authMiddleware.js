const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer') 
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];// Removes "Bearer "

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // CORRECTION: Access 'decoded.user.id' instead of 'decoded.id'
      req.user = await User.findById(decoded.user.id).select('-password');

      next();
    } catch (error) {
      
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    // THIS IS THE ERROR YOU ARE SEEING
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };