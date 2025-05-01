// routes/chatbotRoutes.js
const express = require('express');
const router = express.Router();
const { chat, getConversation } = require('../controllers/chatbotController');
const { protect } = require('../middleware/authMiddleware');

// Public route (can be used without authentication)
router.post('/chat', chat);

// Get conversation history (optionally protected)
router.get('/conversation/:sessionId', getConversation);

module.exports = router;