// models/Alert.js
const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  bloodRequest: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BloodRequest',
    required: true
  },
  recipients: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  sentAt: {
    type: Date,
    default: Date.now
  },
  message: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Sent', 'Read'],
    default: 'Sent'
  }
});

module.exports = mongoose.model('Alert', alertSchema);