// routes/bloodRequestRoutes.js
const express = require('express');
const router = express.Router();
const { 
  createBloodRequest, 
  getAllBloodRequests, 
  getUserBloodRequests, 
  getBloodRequestById, 
  updateBloodRequestStatus 
} = require('../controllers/bloodRequestController');
const { protect, admin } = require('../middleware/authMiddleware');

// Protected routes
router.route('/')
  .post(protect, createBloodRequest)
  .get(protect, getUserBloodRequests);

router.get('/all', protect, getAllBloodRequests);
router.route('/:id')
  .get(protect, getBloodRequestById)
  .put(protect, updateBloodRequestStatus);

module.exports = router;