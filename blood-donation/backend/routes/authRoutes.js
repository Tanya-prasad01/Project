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
const express = require('express');
const router = express.Router();
const { 
  registerUser, 
  loginUser, 
  getUserProfile, 
  updateUserProfile 
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected routes
router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

module.exports = router;