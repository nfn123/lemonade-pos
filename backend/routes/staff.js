const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Location = require('../models/Location');

// Get all staff
router.get('/', async (req, res) => {
  try {
    const staff = await User.find({ role: { $in: ['cashier', 'kitchen'] } }).populate('locationId');
    res.json(staff);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new staff member
router.post('/', async (req, res) => {
  try {
    const { username, email, role, locationId } = req.body;
    
    // Check if user exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({
      username,
      email,
      password: 'temp123', // Temporary password - should be changed by user
      role,
      locationId
    });

    // Hash password
    const bcrypt = require('bcryptjs');
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get staff by location
router.get('/location/:locationId', async (req, res) => {
  try {
    const staff = await User.find({
      locationId: req.params.locationId,
      role: { $in: ['cashier', 'kitchen'] }
    });
    res.json(staff);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
