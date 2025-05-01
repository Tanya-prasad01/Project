// routes/chatRoutes.js
const express = require('express');
const router = express.Router();
const { 
  sendMessage, 
  getConversation, 
  getUserConversations, 
  getUnreadCount 
} = require('../controllers/chatController');
const { protect } = require('../middleware/authMiddleware');

// All chat routes are protected
router.use(protect);

router.post('/send', sendMessage);
router.get('/conversations', getUserConversations);
router.get('/conversation/:userId', getConversation);
router.get('/unread', getUnreadCount);

module.exports = router;