// routes/donorRoutes.js
const express = require('express');
const router = express.Router();
const { 
  searchDonors, 
  scheduleDonation, 
  getUserDonations, 
  updateDonationStatus 
} = require('../controllers/donorController');
const { protect } = require('../middleware/authMiddleware');

// Public routes
router.get('/search', searchDonors);

// Protected routes
router.post('/schedule', protect, scheduleDonation);
router.get('/my-donations', protect, getUserDonations);
router.put('/donation/:id', protect, updateDonationStatus);

module.exports = router;