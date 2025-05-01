// // const mongoose = require('mongoose');
// // const bcrypt = require('bcryptjs');

// // // User schema
// // const userSchema = new mongoose.Schema({
// //   username: {
// //     type: String,
// //     required: true,
// //     unique: true,
// //   },
// //   email: {
// //     type: String,
// //     required: true,
// //     unique: true,
// //   },
// //   password: {
// //     type: String,
// //     required: true,
// //   },
// // });

// // userSchema.pre('save', async function(next) {
// //   if (!this.isModified('password')) return next();
// //   this.password = await bcrypt.hash(this.password, 10);
// //   next();
// // });

// // userSchema.methods.matchPassword = async function(enteredPassword) {
// //   return await bcrypt.compare(enteredPassword, this.password);
// // };

// // const User = mongoose.model('User', userSchema);
// // module.exports = User;



// // const mongoose = require('mongoose');
// // const bcrypt = require('bcryptjs');

// // const userSchema = new mongoose.Schema({
// //   name: {
// //     type: String,
// //     required: true,
// //     trim: true
// //   },
// //   email: {
// //     type: String,
// //     required: true,
// //     unique: true,
// //     lowercase: true,
// //     trim: true
// //   },
// //   password: {
// //     type: String,
// //     required: true,
// //     minlength: 8,
// //     select: false // Exclude password from query results by default
// //   },
// //   bloodGroup: {
// //     type: String,
// //     required: true,
// //     enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
// //   },
// //   location: {
// //     type: String,
// //     required: true
// //   },
// //   phone: {
// //     type: String,
// //     required: true,
// //     match: [/^\d{10}$/, 'Please enter a valid 10-digit phone number']
// //   },
// //   role: {
// //     type: String,
// //     enum: ['donor', 'receiver', 'admin'],
// //     default: 'receiver'
// //   }
// // }, {
// //   timestamps: true
// // });

// // // Pre-save middleware to hash password
// // userSchema.pre('save', async function(next) {
// //   if (!this.isModified('password')) return next();

// //   try {
// //     const salt = await bcrypt.genSalt(10);
// //     this.password = await bcrypt.hash(this.password, salt);
// //     next();
// //   } catch (err) {
// //     next(err);
// //   }
// // });

// // // Instance method to compare passwords
// // userSchema.methods.matchPassword = async function(enteredPassword) {
// //   return await bcrypt.compare(enteredPassword, this.password);
// // };

// // module.exports = mongoose.model('User', userSchema);




// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   phone: { type: String, required: true },
//   location: { type: String, required: true },
//   password: { type: String, required: true },
//   bloodGroup: { type: String, required: true },
//   role: { type: String, enum: ['donor', 'receiver'], required: true }
// });

// module.exports = mongoose.model('User', userSchema);


// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  phone: { 
    type: String, 
    required: true 
  },
  location: { 
    type: String, 
    required: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  bloodGroup: { 
    type: String, 
    required: true 
  },
  role: { 
    type: String, 
    enum: ['donor', 'receiver'], 
    required: true 
  },
  lastDonation: {
    type: Date,
    default: null
  },
  availability: {
    type: String,
    default: 'Available'
  },
  coordinates: {
    type: {
      lat: Number,
      lng: Number
    },
    default: null
  },
  emergencyAlerts: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Match password method
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Encrypt password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model('User', userSchema);