// routes/alertRoutes.js
const express = require('express');
const router = express.Router();
const { 
  getUserAlerts, 
  markAlertAsRead 
} = require('../controllers/alertController');
const { protect } = require('../middleware/authMiddleware');

// All alert routes are protected
router.use(protect);

router.get('/', getUserAlerts);
router.put('/:id', markAlertAsRead);

module.exports = router;