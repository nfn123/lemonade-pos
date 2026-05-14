const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  locationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Location',
    required: true
  },
  items: [
    {
      fruit: String,
      size: String,
      chocolateChips: Boolean,
      price: Number
    }
  ],
  total: Number,
  status: {
    type: String,
    enum: ['pending', 'completed'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  completedAt: Date
});

module.exports = mongoose.model('Order', OrderSchema);
