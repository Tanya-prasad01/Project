// const User = require('../models/User');
// const jwt = require('jsonwebtoken');

// // Generate JWT
// const generateToken = (id) => {
//     return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
// };

// // Register User
// exports.registerUser = async (req, res) => {
//     const { name, email, password, bloodGroup, location, phone, role } = req.body;

//     try {
//         const userExists = await User.findOne({ email });

//         if (userExists) {
//             return res.status(400).json({ message: 'User already exists' });
//         }

//         const user = await User.create({
//             name,
//             email,
//             password,
//             bloodGroup,
//             location,
//             phone,
//             role,
//         });

//         res.status(201).json({
//             _id: user._id,
//             name: user.name,
//             email: user.email,
//             role: user.role,
//             token: generateToken(user._id),
//         });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// // Login User
// exports.loginUser = async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const user = await User.findOne({ email });

//         if (user && (await user.matchPassword(password))) {
//             res.json({
//                 _id: user._id,
//                 name: user.name,
//                 email: user.email,
//                 role: user.role,
//                 token: generateToken(user._id),
//             });
//         } else {
//             res.status(401).json({ message: 'Invalid email or password' });
//         }
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };






// controllers/authController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// Register User
exports.registerUser = async (req, res) => {
  const { name, email, password, bloodGroup, location, phone, role } = req.body;

  try {
    // Check if coordinates are provided, otherwise use null
    const coordinates = req.body.coordinates || null;
    
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
      name,
      email,
      password,
      bloodGroup,
      location,
      phone,
      role,
      coordinates
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      bloodGroup: user.bloodGroup,
      location: user.location,
      phone: user.phone,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Login User
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        bloodGroup: user.bloodGroup,
        location: user.location,
        phone: user.phone,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get user profile
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Update user profile
exports.updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    user.name = req.body.name || user.name;
    user.location = req.body.location || user.location;
    user.phone = req.body.phone || user.phone;
    
    // Only donors can update this
    if (user.role === 'donor') {
      user.availability = req.body.availability || user.availability;
    }
    
    // Only update bloodGroup if provided
    if (req.body.bloodGroup) {
      user.bloodGroup = req.body.bloodGroup;
    }
    
    // Only update coordinates if provided
    if (req.body.coordinates) {
      user.coordinates = req.body.coordinates;
    }
    
    // Update emergencyAlerts preference if provided
    if (req.body.emergencyAlerts !== undefined) {
      user.emergencyAlerts = req.body.emergencyAlerts;
    }
    
    // Update password if provided
    if (req.body.password) {
      user.password = req.body.password;
    }
    
    const updatedUser = await user.save();
    
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      bloodGroup: updatedUser.bloodGroup,
      location: updatedUser.location,
      phone: updatedUser.phone,
      availability: updatedUser.availability,
      coordinates: updatedUser.coordinates,
      emergencyAlerts: updatedUser.emergencyAlerts,
      token: generateToken(updatedUser._id),
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: error.message });
  }
};