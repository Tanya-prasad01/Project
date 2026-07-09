// // models/BloodRequest.js
// const mongoose = require('mongoose');

// const bloodRequestSchema = new mongoose.Schema({
//   requester: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
//   patientName: {
//     type: String,
//     required: true
//   },
//   bloodGroup: {
//     type: String,
//     required: true
//   },
//   units: {
//     type: Number,
//     required: true
//   },
//   hospital: {
//     type: String,
//     required: true
//   },
//   location: {
//     type: String,
//     required: true
//   },
//   coordinates: {
//     lat: Number,
//     lng: Number
//   },
//   contactPhone: {
//     type: String,
//     required: true
//   },
//   urgency: {
//     type: String,
//     enum: ['normal', 'urgent', 'emergency'],
//     default: 'normal'
//   },
//   status: {
//     type: String,
//     enum: ['pending', 'fulfilled', 'cancelled'],
//     default: 'pending'
//   },
//   notes: {
//     type: String
//   },
//   expiresAt: {
//     type: Date,
//     default: function() {
//       // Emergency requests expire in 24 hours
//       const now = new Date();
//       if (this.urgency === 'emergency') {
//         return new Date(now.getTime() + 24 * 60 * 60 * 1000);
//       }
//       // Regular requests expire in 7 days
//       return new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
//     }
//   },
//   notifiedDonors: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User'
//   }],
//   createdAt: {
//     type: Date,
//     default: Date.now
//   }
// });

// module.exports = mongoose.model('BloodRequest', bloodRequestSchema);



//new
// models/BloodRequest.js
const mongoose = require('mongoose');

const bloodRequestSchema = new mongoose.Schema({
  requester: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  patientName: {
    type: String,
    required: true
  },
  bloodGroup: {
    type: String,
    required: true
  },
  units: {
    type: Number,
    required: true,
    default: 1
  },
  hospital: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  coordinates: {
    lat: Number,
    lng: Number
  },
  contactPhone: {
    type: String,
    required: true
  },
  urgency: {
    type: String,
    enum: ['normal', 'urgent', 'emergency'],
    default: 'normal'
  },
  status: {
    type: String,
    enum: ['pending', 'fulfilled', 'cancelled'],
    default: 'pending'
  },
  notes: {
    type: String
  },
  expiresAt: {
    type: Date,
    default: function() {
      // Emergency requests expire in 24 hours
      const now = new Date();
      if (this.urgency === 'emergency') {
        return new Date(now.getTime() + 24 * 60 * 60 * 1000);
      }
      // Regular requests expire in 7 days
      return new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    }
  },
  notifiedDonors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('BloodRequest', bloodRequestSchema);