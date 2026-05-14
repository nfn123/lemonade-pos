const express = require('express');
const router = express.Router();
const PricingRequest = require('../models/PricingRequest');

// Get all pricing requests
router.get('/', async (req, res) => {
  try {
    const requests = await PricingRequest.find()
      .populate('staffId')
      .populate('locationId')
      .sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create pricing request
router.post('/', async (req, res) => {
  try {
    const { locationId, staffId, itemName, oldPrice, newPrice, reason } = req.body;
    
    const request = new PricingRequest({
      locationId,
      staffId,
      itemName,
      oldPrice,
      newPrice,
      reason
    });

    await request.save();
    res.json(request);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Approve pricing request
router.patch('/:id/approve', async (req, res) => {
  try {
    const { adminId } = req.body;
    
    const request = await PricingRequest.findById(req.params.id);
    if (!request) return res.status(404).json({ msg: 'Request not found' });
    
    request.status = 'approved';
    request.approvedBy = adminId;
    request.resolvedAt = new Date();
    
    await request.save();
    res.json(request);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Reject pricing request
router.patch('/:id/reject', async (req, res) => {
  try {
    const { rejectionReason } = req.body;
    
    const request = await PricingRequest.findById(req.params.id);
    if (!request) return res.status(404).json({ msg: 'Request not found' });
    
    request.status = 'rejected';
    request.rejectionReason = rejectionReason;
    request.resolvedAt = new Date();
    
    await request.save();
    res.json(request);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
