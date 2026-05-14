const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  pricing: {
    mini: {
      type: Number,
      default: 1.00
    },
    regular: {
      type: Number,
      default: 2.75
    }
  },
  availableFruits: [String],
  customFruits: [String],
  hasChocolateChips: {
    type: Boolean,
    default: false
  },
  customToppings: [String],
  setupCompleted: {
    type: Boolean,
    default: false
  },
  setupCompletedAt: Date,
  isTestLocation: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Location', LocationSchema);
