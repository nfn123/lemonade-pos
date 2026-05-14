const express = require('express');
const router = express.Router();
const Location = require('../models/Location');

// Get all locations
router.get('/', async (req, res) => {
  try {
    const locations = await Location.find();
    res.json(locations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get location by ID
router.get('/:id', async (req, res) => {
  try {
    const location = await Location.findById(req.params.id);
    if (!location) return res.status(404).json({ msg: 'Location not found' });
    res.json(location);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new location
router.post('/', async (req, res) => {
  try {
    const { name, address, pricing } = req.body;
    
    const location = new Location({
      name,
      address,
      pricing: pricing || { mini: 1.00, regular: 2.75 }
    });

    await location.save();
    res.json(location);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update location
router.put('/:id', async (req, res) => {
  try {
    const { name, address, pricing, availableFruits, customFruits, hasChocolateChips, customToppings, setupCompleted } = req.body;
    
    let location = await Location.findById(req.params.id);
    if (!location) return res.status(404).json({ msg: 'Location not found' });

    if (name) location.name = name;
    if (address) location.address = address;
    if (pricing) location.pricing = pricing;
    if (availableFruits) location.availableFruits = availableFruits;
    if (customFruits) location.customFruits = customFruits;
    if (hasChocolateChips !== undefined) location.hasChocolateChips = hasChocolateChips;
    if (customToppings) location.customToppings = customToppings;
    if (setupCompleted !== undefined) {
      location.setupCompleted = setupCompleted;
      if (setupCompleted) location.setupCompletedAt = new Date();
    }

    await location.save();
    res.json(location);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get fruits for location
router.get('/:id/fruits', async (req, res) => {
  try {
    const location = await Location.findById(req.params.id);
    if (!location) return res.status(404).json({ msg: 'Location not found' });
    
    const allFruits = [
      ...location.availableFruits,
      ...location.customFruits
    ];
    
    res.json({ fruits: allFruits });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
