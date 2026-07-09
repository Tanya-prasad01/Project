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






// // controllers/authController.js
// const User = require('../models/User');
// const jwt = require('jsonwebtoken');

// // Generate JWT
// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
// };

// // Register User
// exports.registerUser = async (req, res) => {
//   const { name, email, password, bloodGroup, location, phone, role } = req.body;

//   try {
//     // Check if coordinates are provided, otherwise use null
//     const coordinates = req.body.coordinates || null;
    
//     const userExists = await User.findOne({ email });

//     if (userExists) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     const user = await User.create({
//       name,
//       email,
//       password,
//       bloodGroup,
//       location,
//       phone,
//       role,
//       coordinates
//     });

//     res.status(201).json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       role: user.role,
//       bloodGroup: user.bloodGroup,
//       location: user.location,
//       phone: user.phone,
//       token: generateToken(user._id),
//     });
//   } catch (error) {
//     console.error('Register error:', error);
//     res.status(500).json({ message: error.message });
//   }
// };

// // Login User
// exports.loginUser = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });

//     if (user && (await user.matchPassword(password))) {
//       res.json({
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//         bloodGroup: user.bloodGroup,
//         location: user.location,
//         phone: user.phone,
//         token: generateToken(user._id),
//       });
//     } else {
//       res.status(401).json({ message: 'Invalid email or password' });
//     }
//   } catch (error) {
//     console.error('Login error:', error);
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get user profile
// exports.getUserProfile = async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id).select('-password');
    
//     if (user) {
//       res.json(user);
//     } else {
//       res.status(404).json({ message: 'User not found' });
//     }
//   } catch (error) {
//     console.error('Get profile error:', error);
//     res.status(500).json({ message: error.message });
//   }
// };

// // Update user profile
// exports.updateUserProfile = async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id);
    
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }
    
//     user.name = req.body.name || user.name;
//     user.location = req.body.location || user.location;
//     user.phone = req.body.phone || user.phone;
    
//     // Only donors can update this
//     if (user.role === 'donor') {
//       user.availability = req.body.availability || user.availability;
//     }
    
//     // Only update bloodGroup if provided
//     if (req.body.bloodGroup) {
//       user.bloodGroup = req.body.bloodGroup;
//     }
    
//     // Only update coordinates if provided
//     if (req.body.coordinates) {
//       user.coordinates = req.body.coordinates;
//     }
    
//     // Update emergencyAlerts preference if provided
//     if (req.body.emergencyAlerts !== undefined) {
//       user.emergencyAlerts = req.body.emergencyAlerts;
//     }
    
//     // Update password if provided
//     if (req.body.password) {
//       user.password = req.body.password;
//     }
    
//     const updatedUser = await user.save();
    
//     res.json({
//       _id: updatedUser._id,
//       name: updatedUser.name,
//       email: updatedUser.email,
//       role: updatedUser.role,
//       bloodGroup: updatedUser.bloodGroup,
//       location: updatedUser.location,
//       phone: updatedUser.phone,
//       availability: updatedUser.availability,
//       coordinates: updatedUser.coordinates,
//       emergencyAlerts: updatedUser.emergencyAlerts,
//       token: generateToken(updatedUser._id),
//     });
//   } catch (error) {
//     console.error('Update profile error:', error);
//     res.status(500).json({ message: error.message });
//   }
// };


//the new one with forgot password 
// // controllers/authController.js
// const User = require('../models/User');
// const generateToken = require('../utils/generateToken');
// const crypto = require('crypto');
// const nodemailer = require('nodemailer');

// // Configure nodemailer
// let transporter;

// // Setup test email account
// async function setupMailer() {
//   try {
//     // Create test account
//     const testAccount = await nodemailer.createTestAccount();
    
//     // Create transporter
//     transporter = nodemailer.createTransport({
//       host: 'smtp.ethereal.email',
//       port: 587,
//       secure: false,
//       auth: {
//         user: testAccount.user,
//         pass: testAccount.pass
//       }
//     });
    
//     console.log('Email test account created:', testAccount.user);
//   } catch (error) {
//     console.error('Error setting up email:', error);
//   }
// }

// setupMailer();

// // @desc    Register a new user
// // @route   POST /api/auth/register
// // @access  Public
// const registerUser = async (req, res) => {
//   const { name, email, phone, location, password, bloodGroup, role } = req.body;

//   try {
//     const userExists = await User.findOne({ email });

//     if (userExists) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     const user = await User.create({
//       name,
//       email,
//       phone,
//       location,
//       password,
//       bloodGroup,
//       role
//     });

//     if (user) {
//       res.status(201).json({
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         phone: user.phone,
//         location: user.location,
//         bloodGroup: user.bloodGroup,
//         role: user.role,
//         token: generateToken(user._id)
//       });
//     } else {
//       res.status(400).json({ message: 'Invalid user data' });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // @desc    Auth user & get token
// // @route   POST /api/auth/login
// // @access  Public
// const loginUser = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });

//     if (user && (await user.matchPassword(password))) {
//       res.json({
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         phone: user.phone,
//         location: user.location,
//         bloodGroup: user.bloodGroup,
//         role: user.role,
//         token: generateToken(user._id)
//       });
//     } else {
//       res.status(401).json({ message: 'Invalid email or password' });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // @desc    Get user profile
// // @route   GET /api/auth/profile
// // @access  Private
// const getUserProfile = async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id);

//     if (user) {
//       res.json({
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         phone: user.phone,
//         location: user.location,
//         bloodGroup: user.bloodGroup,
//         role: user.role,
//         lastDonation: user.lastDonation,
//         availability: user.availability,
//         coordinates: user.coordinates,
//         emergencyAlerts: user.emergencyAlerts
//       });
//     } else {
//       res.status(404).json({ message: 'User not found' });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // @desc    Update user profile
// // @route   PUT /api/auth/profile
// // @access  Private
// const updateUserProfile = async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id);

//     if (user) {
//       user.name = req.body.name || user.name;
//       user.email = req.body.email || user.email;
//       user.phone = req.body.phone || user.phone;
//       user.location = req.body.location || user.location;
//       user.bloodGroup = req.body.bloodGroup || user.bloodGroup;
//       user.availability = req.body.availability || user.availability;
//       user.lastDonation = req.body.lastDonation || user.lastDonation;
//       user.emergencyAlerts = req.body.emergencyAlerts !== undefined ? req.body.emergencyAlerts : user.emergencyAlerts;
      
//       if (req.body.coordinates) {
//         user.coordinates = req.body.coordinates;
//       }
      
//       if (req.body.password) {
//         user.password = req.body.password;
//       }

//       const updatedUser = await user.save();

//       res.json({
//         _id: updatedUser._id,
//         name: updatedUser.name,
//         email: updatedUser.email,
//         phone: updatedUser.phone,
//         location: updatedUser.location,
//         bloodGroup: updatedUser.bloodGroup,
//         role: updatedUser.role,
//         lastDonation: updatedUser.lastDonation,
//         availability: updatedUser.availability,
//         coordinates: updatedUser.coordinates,
//         emergencyAlerts: updatedUser.emergencyAlerts,
//         token: generateToken(updatedUser._id)
//       });
//     } else {
//       res.status(404).json({ message: 'User not found' });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // @desc    Forgot password
// // @route   POST /api/auth/forgot-password
// // @access  Public
// const forgotPassword = async (req, res) => {
//   try {
//     const { email } = req.body;
    
//     // Find user by email
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: 'User with this email does not exist' });
//     }
    
//     // Generate a reset token
//     const resetToken = crypto.randomBytes(32).toString('hex');
//     const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    
//     // Save token to user
//     user.resetPasswordToken = hashedToken;
//     user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
//     await user.save();
    
//     // Create reset URL
//     const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;
    
//     // Create email message
//     const message = {
//       from: 'noreply@blooddonation.com',
//       to: user.email,
//       subject: 'Password Reset',
//       html: `
//         <h1>Password Reset Request</h1>
//         <p>You requested a password reset</p>
//         <p>Click this link to reset your password: <a href="${resetUrl}">${resetUrl}</a></p>
//         <p>This link is valid for 1 hour.</p>
//       `
//     };
    
//     // Send email
//     const info = await transporter.sendMail(message);
    
//     // Get preview URL for development
//     const previewUrl = nodemailer.getTestMessageUrl(info);
//     console.log('Preview URL: %s', previewUrl);
    
//     res.status(200).json({ 
//       message: 'Password reset email sent', 
//       previewUrl: previewUrl 
//     });
    
//   } catch (error) {
//     console.error('Password reset error:', error);
//     res.status(500).json({ message: 'Error sending password reset email' });
//   }
// };

// // @desc    Reset password
// // @route   POST /api/auth/reset-password/:token
// // @access  Public
// const resetPassword = async (req, res) => {
//   try {
//     const { token } = req.params;
//     const { password } = req.body;
    
//     // Hash the token from the URL
//     const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    
//     // Find user with this token and check if token is still valid
//     const user = await User.findOne({
//       resetPasswordToken: hashedToken,
//       resetPasswordExpires: { $gt: Date.now() }
//     });
    
//     if (!user) {
//       return res.status(400).json({ message: 'Token is invalid or has expired' });
//     }
    
//     // Set new password
//     user.password = password;
//     user.resetPasswordToken = undefined;
//     user.resetPasswordExpires = undefined;
//     await user.save();
    
//     res.status(200).json({ message: 'Password has been reset successfully' });
    
//   } catch (error) {
//     console.error('Password reset error:', error);
//     res.status(500).json({ message: 'Error resetting password' });
//   }
// };

// module.exports = {
//   registerUser,
//   loginUser,
//   getUserProfile,
//   updateUserProfile,
//   forgotPassword,
//   resetPassword
// };


//new with email
// Gmail-based transporter
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   }
// });

// // Forgot Password Controller
// const forgotPassword = async (req, res) => {
//   try {
//     const { email } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     const resetToken = crypto.randomBytes(32).toString('hex');
//     const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

//     user.resetPasswordToken = hashedToken;
//     user.resetPasswordExpires = Date.now() + 3600000; // 1hr
//     await user.save();

//     const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;
//     const message = {
//       from: process.env.EMAIL_USER,
//       to: user.email,
//       subject: 'Password Reset Link',
//       html: `
//         <p>You requested a password reset</p>
//         <a href="${resetUrl}">Click here to reset password</a>
//         <p>Valid for 1 hour.</p>
//       `
//     };

//     await transporter.sendMail(message);
//     res.status(200).json({ message: 'Password reset email sent' });

//   } catch (error) {
//     console.error('Forgot password error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // Reset Password Controller
// const resetPassword = async (req, res) => {
//   try {
//     const { token } = req.params;
//     const { password } = req.body;

//     const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
//     const user = await User.findOne({
//       resetPasswordToken: hashedToken,
//       resetPasswordExpires: { $gt: Date.now() },
//     });

//     if (!user) return res.status(400).json({ message: 'Invalid or expired token' });

//     user.password = password;
//     user.resetPasswordToken = undefined;
//     user.resetPasswordExpires = undefined;
//     await user.save();

//     res.status(200).json({ message: 'Password has been reset' });

//   } catch (error) {
//     console.error('Reset password error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };




// //new one with email
// const User = require('../models/User');
// const generateToken = require('../utils/generateToken');
// const crypto = require('crypto');
// const nodemailer = require('nodemailer');

// // Gmail-based transporter
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// // @desc    Register a new user
// // @route   POST /api/auth/register
// // @access  Public
// const registerUser = async (req, res) => {
//   const { name, email, phone, location, password, bloodGroup, role } = req.body;

//   try {
//     const userExists = await User.findOne({ email });

//     if (userExists) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     const user = await User.create({
//       name,
//       email,
//       phone,
//       location,
//       password,
//       bloodGroup,
//       role
//     });

//     if (user) {
//       res.status(201).json({
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         phone: user.phone,
//         location: user.location,
//         bloodGroup: user.bloodGroup,
//         role: user.role,
//         token: generateToken(user._id)
//       });
//     } else {
//       res.status(400).json({ message: 'Invalid user data' });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // @desc    Auth user & get token
// // @route   POST /api/auth/login
// // @access  Public
// const loginUser = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });

//     if (user && (await user.matchPassword(password))) {
//       res.json({
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         phone: user.phone,
//         location: user.location,
//         bloodGroup: user.bloodGroup,
//         role: user.role,
//         token: generateToken(user._id)
//       });
//     } else {
//       res.status(401).json({ message: 'Invalid email or password' });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // @desc    Get user profile
// // @route   GET /api/auth/profile
// // @access  Private
// const getUserProfile = async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id);

//     if (user) {
//       res.json({
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         phone: user.phone,
//         location: user.location,
//         bloodGroup: user.bloodGroup,
//         role: user.role,
//         lastDonation: user.lastDonation,
//         availability: user.availability,
//         coordinates: user.coordinates,
//         emergencyAlerts: user.emergencyAlerts
//       });
//     } else {
//       res.status(404).json({ message: 'User not found' });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // @desc    Update user profile
// // @route   PUT /api/auth/profile
// // @access  Private
// const updateUserProfile = async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id);

//     if (user) {
//       user.name = req.body.name || user.name;
//       user.email = req.body.email || user.email;
//       user.phone = req.body.phone || user.phone;
//       user.location = req.body.location || user.location;
//       user.bloodGroup = req.body.bloodGroup || user.bloodGroup;
//       user.availability = req.body.availability || user.availability;
//       user.lastDonation = req.body.lastDonation || user.lastDonation;
//       user.emergencyAlerts = req.body.emergencyAlerts !== undefined ? req.body.emergencyAlerts : user.emergencyAlerts;

//       if (req.body.coordinates) {
//         user.coordinates = req.body.coordinates;
//       }

//       if (req.body.password) {
//         user.password = req.body.password;
//       }

//       const updatedUser = await user.save();

//       res.json({
//         _id: updatedUser._id,
//         name: updatedUser.name,
//         email: updatedUser.email,
//         phone: updatedUser.phone,
//         location: updatedUser.location,
//         bloodGroup: updatedUser.bloodGroup,
//         role: updatedUser.role,
//         lastDonation: updatedUser.lastDonation,
//         availability: updatedUser.availability,
//         coordinates: updatedUser.coordinates,
//         emergencyAlerts: updatedUser.emergencyAlerts,
//         token: generateToken(updatedUser._id)
//       });
//     } else {
//       res.status(404).json({ message: 'User not found' });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // @desc    Forgot Password
// // @route   POST /api/auth/forgot-password
// // @access  Public
// const forgotPassword = async (req, res) => {
//   try {
//     const { email } = req.body;
//     const user = await User.findOne({ email });

//     if (!user) return res.status(404).json({ message: 'User not found' });

//     const resetToken = crypto.randomBytes(32).toString('hex');
//     const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

//     user.resetPasswordToken = hashedToken;
//     user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
//     await user.save();

//     const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;
//     const message = {
//       from: process.env.EMAIL_USER,
//       to: user.email,
//       subject: 'Password Reset Link',
//       html: `
//         <p>You requested a password reset</p>
//         <a href="${resetUrl}">Click here to reset password</a>
//         <p>This link is valid for 1 hour.</p>
//       `
//     };

//     await transporter.sendMail(message);
//     res.status(200).json({ message: 'Password reset email sent' });

//   } catch (error) {
//     console.error('Forgot password error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // @desc    Reset Password
// // @route   POST /api/auth/reset-password/:token
// // @access  Public
// const resetPassword = async (req, res) => {
//   try {
//     const { token } = req.params;
//     const { password } = req.body;

//     const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
//     const user = await User.findOne({
//       resetPasswordToken: hashedToken,
//       resetPasswordExpires: { $gt: Date.now() },
//     });

//     if (!user) return res.status(400).json({ message: 'Invalid or expired token' });

//     user.password = password;
//     user.resetPasswordToken = undefined;
//     user.resetPasswordExpires = undefined;
//     await user.save();

//     res.status(200).json({ message: 'Password has been reset successfully' });

//   } catch (error) {
//     console.error('Reset password error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// module.exports = {
//   registerUser,
//   loginUser,
//   getUserProfile,
//   updateUserProfile,
//   forgotPassword,
//   resetPassword
// };





 //newww
// const User = require('../models/User');
// const generateToken = require('../utils/generateToken');
// const crypto = require('crypto');
// const nodemailer = require('nodemailer');
// const bcrypt = require('bcryptjs');

// // Gmail-based transporter
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// // @desc    Register a new user
// // @route   POST /api/auth/register
// // @access  Public
// const registerUser = async (req, res) => {
//   const { name, email, phone, location, password, bloodGroup, role } = req.body;

//   try {
//     const userExists = await User.findOne({ email });

//     if (userExists) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     const user = await User.create({
//       name,
//       email,
//       phone,
//       location,
//       password,
//       bloodGroup,
//       role
//     });

//     if (user) {
//       res.status(201).json({
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         phone: user.phone,
//         location: user.location,
//         bloodGroup: user.bloodGroup,
//         role: user.role,
//         token: generateToken(user._id)
//       });
//     } else {
//       res.status(400).json({ message: 'Invalid user data' });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // @desc    Auth user & get token
// // @route   POST /api/auth/login
// // @access  Public
// const loginUser = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });

//     if (user && (await user.matchPassword(password))) {
//       res.json({
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         phone: user.phone,
//         location: user.location,
//         bloodGroup: user.bloodGroup,
//         role: user.role,
//         token: generateToken(user._id)
//       });
//     } else {
//       res.status(401).json({ message: 'Invalid email or password' });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // @desc    Get user profile
// // @route   GET /api/auth/profile
// // @access  Private
// const getUserProfile = async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id);

//     if (user) {
//       res.json({
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         phone: user.phone,
//         location: user.location,
//         bloodGroup: user.bloodGroup,
//         role: user.role,
//         lastDonation: user.lastDonation,
//         availability: user.availability,
//         coordinates: user.coordinates,
//         emergencyAlerts: user.emergencyAlerts
//       });
//     } else {
//       res.status(404).json({ message: 'User not found' });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // @desc    Update user profile
// // @route   PUT /api/auth/profile
// // @access  Private
// const updateUserProfile = async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id);

//     if (user) {
//       user.name = req.body.name || user.name;
//       user.email = req.body.email || user.email;
//       user.phone = req.body.phone || user.phone;
//       user.location = req.body.location || user.location;
//       user.bloodGroup = req.body.bloodGroup || user.bloodGroup;
//       user.availability = req.body.availability || user.availability;
//       user.lastDonation = req.body.lastDonation || user.lastDonation;
//       user.emergencyAlerts = req.body.emergencyAlerts !== undefined ? req.body.emergencyAlerts : user.emergencyAlerts;

//       if (req.body.coordinates) {
//         user.coordinates = req.body.coordinates;
//       }

//       if (req.body.password) {
//         user.password = await bcrypt.hash(req.body.password, 10);
//       }

//       const updatedUser = await user.save();

//       res.json({
//         _id: updatedUser._id,
//         name: updatedUser.name,
//         email: updatedUser.email,
//         phone: updatedUser.phone,
//         location: updatedUser.location,
//         bloodGroup: updatedUser.bloodGroup,
//         role: updatedUser.role,
//         lastDonation: updatedUser.lastDonation,
//         availability: updatedUser.availability,
//         coordinates: updatedUser.coordinates,
//         emergencyAlerts: updatedUser.emergencyAlerts,
//         token: generateToken(updatedUser._id)
//       });
//     } else {
//       res.status(404).json({ message: 'User not found' });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // @desc    Forgot Password
// // @route   POST /api/auth/forgot-password
// // @access  Public
// const forgotPassword = async (req, res) => {
//   try {
//     const { email } = req.body;
//     const user = await User.findOne({ email });

//     if (!user) return res.status(404).json({ message: 'User not found' });

//     const resetToken = crypto.randomBytes(32).toString('hex');
//     const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

//     user.resetPasswordToken = hashedToken;
//     user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
//     await user.save();

//     const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;
//     const message = {
//       from: process.env.EMAIL_USER,
//       to: user.email,
//       subject: 'Password Reset Link',
//       html: `
//         <p>You requested a password reset</p>
//         <a href="${resetUrl}">Click here to reset password</a>
//         <p>This link is valid for 1 hour.</p>
//       `
//     };

//     await transporter.sendMail(message);
//     res.status(200).json({ message: 'Password reset email sent' });

//   } catch (error) {
//     console.error('Forgot password error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // @desc    Reset Password
// // @route   POST /api/auth/reset-password/:token
// // @access  Public
// const resetPassword = async (req, res) => {
//   try {
//     const { token } = req.params;
//     const { password } = req.body;

//     const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
//     const user = await User.findOne({
//       resetPasswordToken: hashedToken,
//       resetPasswordExpires: { $gt: Date.now() },
//     });

//     if (!user) return res.status(400).json({ message: 'Invalid or expired token' });

//     user.password = await bcrypt.hash(password, 10); // <-- Important fix
//     user.resetPasswordToken = undefined;
//     user.resetPasswordExpires = undefined;
//     await user.save();

//     res.status(200).json({ message: 'Password has been reset successfully' });

//   } catch (error) {
//     console.error('Reset password error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// module.exports = {
//   registerUser,
//   loginUser,
//   getUserProfile,
//   updateUserProfile,
//   forgotPassword,
//   resetPassword
// };




//new new

const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');

// Gmail-based transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  const { name, email, phone, location, password, bloodGroup, role } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
      name,
      email,
      phone,
      location,
      password,
      bloodGroup,
      role
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        location: user.location,
        bloodGroup: user.bloodGroup,
        role: user.role,
        token: generateToken(user._id)
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    console.log("🔍 Email received:", email);
    console.log("👤 User found in DB:", user);

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        location: user.location,
        bloodGroup: user.bloodGroup,
        role: user.role,
        token: generateToken(user._id)
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        location: user.location,
        bloodGroup: user.bloodGroup,
        role: user.role,
        lastDonation: user.lastDonation,
        availability: user.availability,
        coordinates: user.coordinates,
        emergencyAlerts: user.emergencyAlerts
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.phone = req.body.phone || user.phone;
      user.location = req.body.location || user.location;
      user.bloodGroup = req.body.bloodGroup || user.bloodGroup;
      user.availability = req.body.availability || user.availability;
      user.lastDonation = req.body.lastDonation || user.lastDonation;
      user.emergencyAlerts = req.body.emergencyAlerts !== undefined ? req.body.emergencyAlerts : user.emergencyAlerts;

      if (req.body.coordinates) {
        user.coordinates = req.body.coordinates;
      }

      if (req.body.password) {
        user.password = await bcrypt.hash(req.body.password, 10);
      }

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        location: updatedUser.location,
        bloodGroup: updatedUser.bloodGroup,
        role: updatedUser.role,
        lastDonation: updatedUser.lastDonation,
        availability: updatedUser.availability,
        coordinates: updatedUser.coordinates,
        emergencyAlerts: updatedUser.emergencyAlerts,
        token: generateToken(updatedUser._id)
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Forgot Password
// @route   POST /api/auth/forgot-password
// @access  Public
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: 'User not found' });

    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;
    const message = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Password Reset Link',
      html: `
        <p>You requested a password reset</p>
        <a href="${resetUrl}">Click here to reset password</a>
        <p>This link is valid for 1 hour.</p>
      `
    };

    await transporter.sendMail(message);
    res.status(200).json({ message: 'Password reset email sent' });

  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Reset Password
// @route   POST /api/auth/reset-password/:token
// @access  Public
const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) return res.status(400).json({ message: 'Invalid or expired token' });

    user.password = await bcrypt.hash(password, 10); // <-- Important fix
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ message: 'Password has been reset successfully' });

  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  forgotPassword,
  resetPassword
};


//new new new
// authController.js
// const User = require('../models/User');
// const generateToken = require('../utils/generateToken');
// const crypto = require('crypto');
// const nodemailer = require('nodemailer');

// // Gmail-based transporter
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// // Register a new user
// const registerUser = async (req, res) => {
//   const { name, email, phone, location, password, bloodGroup, role } = req.body;

//   try {
//     if (!password || typeof password !== 'string') {
//       return res.status(400).json({ message: 'Password is required and must be a string' });
//     }

//     const userExists = await User.findOne({ email });
//     if (userExists) return res.status(400).json({ message: 'User already exists' });

//     const user = await User.create({ name, email, phone, location, password, bloodGroup, role });

//     res.status(201).json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       phone: user.phone,
//       location: user.location,
//       bloodGroup: user.bloodGroup,
//       role: user.role,
//       token: generateToken(user._id),
//     });
//   } catch (error) {
//     console.error('Register error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // Login user
// const loginUser = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });

//     if (user && await user.matchPassword(password)) {
//       res.json({
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         phone: user.phone,
//         location: user.location,
//         bloodGroup: user.bloodGroup,
//         role: user.role,
//         token: generateToken(user._id),
//       });
//     } else {
//       res.status(401).json({ message: 'Invalid email or password' });
//     }
//   } catch (error) {
//     console.error('Login error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // Get user profile
// const getUserProfile = async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id);
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     res.json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       phone: user.phone,
//       location: user.location,
//       bloodGroup: user.bloodGroup,
//       role: user.role,
//       lastDonation: user.lastDonation,
//       availability: user.availability,
//       coordinates: user.coordinates,
//       emergencyAlerts: user.emergencyAlerts,
//     });
//   } catch (error) {
//     console.error('Get profile error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // Update user profile
// const updateUserProfile = async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id);
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     user.name = req.body.name || user.name;
//     user.email = req.body.email || user.email;
//     user.phone = req.body.phone || user.phone;
//     user.location = req.body.location || user.location;
//     user.bloodGroup = req.body.bloodGroup || user.bloodGroup;
//     user.availability = req.body.availability || user.availability;
//     user.lastDonation = req.body.lastDonation || user.lastDonation;
//     user.emergencyAlerts = req.body.emergencyAlerts !== undefined ? req.body.emergencyAlerts : user.emergencyAlerts;

//     if (req.body.coordinates) {
//       user.coordinates = req.body.coordinates;
//     }

//     if (req.body.password) {
//       user.password = req.body.password;
//     }

//     const updatedUser = await user.save();

//     res.json({
//       _id: updatedUser._id,
//       name: updatedUser.name,
//       email: updatedUser.email,
//       phone: updatedUser.phone,
//       location: updatedUser.location,
//       bloodGroup: updatedUser.bloodGroup,
//       role: updatedUser.role,
//       lastDonation: updatedUser.lastDonation,
//       availability: updatedUser.availability,
//       coordinates: updatedUser.coordinates,
//       emergencyAlerts: updatedUser.emergencyAlerts,
//       token: generateToken(updatedUser._id),
//     });
//   } catch (error) {
//     console.error('Update profile error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // Forgot Password
// const forgotPassword = async (req, res) => {
//   try {
//     const { email } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     const resetToken = crypto.randomBytes(32).toString('hex');
//     const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

//     user.resetPasswordToken = hashedToken;
//     user.resetPasswordExpires = Date.now() + 60 * 60 * 1000;
//     await user.save();

//     const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;
//     const message = {
//       from: process.env.EMAIL_USER,
//       to: user.email,
//       subject: 'Password Reset Link',
//       html: `
//         <p>You requested a password reset</p>
//         <a href="${resetUrl}">Click here to reset password</a>
//         <p>This link is valid for 1 hour.</p>
//       `,
//     };

//     await transporter.sendMail(message);
//     res.status(200).json({ message: 'Password reset email sent' });
//   } catch (error) {
//     console.error('Forgot password error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // Reset Password
// const resetPassword = async (req, res) => {
//   try {
//     const { token } = req.params;
//     const { password } = req.body;

//     const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
//     const user = await User.findOne({
//       resetPasswordToken: hashedToken,
//       resetPasswordExpires: { $gt: Date.now() },
//     });

//     if (!user) return res.status(400).json({ message: 'Invalid or expired token' });

//     user.password = password;
//     user.resetPasswordToken = undefined;
//     user.resetPasswordExpires = undefined;
//     await user.save();

//     res.status(200).json({ message: 'Password has been reset successfully' });
//   } catch (error) {
//     console.error('Reset password error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// module.exports = {
//   registerUser,
//   loginUser,
//   getUserProfile,
//   updateUserProfile,
//   forgotPassword,
//   resetPassword,
// };
