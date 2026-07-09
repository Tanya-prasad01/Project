const mongoose = require('mongoose');

const emergencyRequestSchema = new mongoose.Schema({
  name: String,
  bloodGroup: String,
  units: String,
  phone: String,
  hospital: String,
  location: String,
  message: String,
  isUrgent: Boolean,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('EmergencyRequest', emergencyRequestSchema);
