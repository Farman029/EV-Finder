const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register a new user
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // 1. Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // 2. Encrypt the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Save to Database
    user = new User({
      name,
      email,
      password: hashedPassword,
      role: role || 'VEHICLE_OWNER' // Default to Vehicle Owner if no role is sent
    });

    await user.save();

    // OPTIONAL: Auto-login after register (send token here too)
    // For now, we just send success message
    res.status(201).json({ msg: 'User registered successfully' });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/auth/login
// @desc    Login user & get token
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    // 2. Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    // 3. Create the "Digital ID Card" (Token)
    // This payload includes the role so verifyStationOwner can read it later
    const payload = {
      user: {
        id: user.id,
        role: user.role 
      }
    };

    // 4. Sign the Token
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '10d' },
      (err, token) => {
        if (err) throw err;
        // Send token AND user info back to frontend
        res.json({ 
            token, 
            user: { 
                id: user.id, 
                name: user.name, 
                role: user.role 
            } 
        });
      }
    );

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;