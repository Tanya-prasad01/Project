// const express = require('express');
// const router = express.Router();
// const { registerUser, loginUser } = require('../controllers/authController');
// const { protect } = require('../middleware/verifyToken');

// // Public routes
// router.post('/register', registerUser);
// router.post('/login', loginUser);
// // Example of a protected route
// router.get('/profile', protect, (req, res) => {
//     res.json(req.user); // return user details if token is valid
// });

// module.exports = router;





// routes/authRoutes.js
// const express = require('express');
// const router = express.Router();
// const { 
//   registerUser, 
//   loginUser, 
//   getUserProfile, 
//   updateUserProfile, 
//   forgotPassword,
//   resetPassword
// } = require('../controllers/authController');
// const { protect } = require('../middleware/authMiddleware');

// // Public routes
// router.post('/register', registerUser);
// router.post('/login', loginUser);
// router.post('/forgot-password', forgotPassword);
// router.post('/reset-password/:token', resetPassword);

// // Protected routes
// router.route('/profile')
//   .get(protect, getUserProfile)
//   .put(protect, updateUserProfile);

// module.exports = router;


//the new one with forgot password and reset password
// // routes/authRoutes.js
// const express = require('express');
// const router = express.Router();
// const {
//   registerUser,
//   loginUser,
//   getUserProfile,
//   updateUserProfile,
//   forgotPassword,
//   resetPassword
// } = require('../controllers/authController');
// const { protect, admin } = require('../middleware/authMiddleware');

// router.post('/register', registerUser);
// router.post('/login', loginUser);
// router.post('/forgot-password', forgotPassword);
// router.post('/reset-password/:token', resetPassword);

// router.get('/profile', protect, getUserProfile);
// router.put('/profile', protect, updateUserProfile);

// // Example protected admin route
// router.get('/admin-dashboard', protect, admin, (req, res) => {
//   res.json({ message: 'Admin Access Granted' });
// });

// module.exports = router;



const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    console.log('Entered Password:', password);
    console.log('Stored Hashed Password:', user?.password);

    if (user && await user.matchPassword(password)) {
      console.log('✅ Password matched');
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        location: user.location,
        bloodGroup: user.bloodGroup,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      console.log('❌ Invalid credentials');
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

