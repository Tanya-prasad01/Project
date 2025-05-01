// controllers/chatController.js
const Message = require('../models/Message');
const User = require('../models/User');

// Send a message
exports.sendMessage = async (req, res) => {
  try {
    const { receiverId, content } = req.body;
    
    // Validate receiver exists
    const receiver = await User.findById(receiverId);
    if (!receiver) {
      return res.status(404).json({ message: 'Receiver not found' });
    }
    
    const message = new Message({
      sender: req.user._id,
      receiver: receiverId,
      content
    });
    
    const savedMessage = await message.save();
    
    res.status(201).json(savedMessage);
  } catch (error) {
    console.error('Send message error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get conversation with another user
exports.getConversation = async (req, res) => {
  try {
    const { userId } = req.params;
    
    const messages = await Message.find({
      $or: [
        { sender: req.user._id, receiver: userId },
        { sender: userId, receiver: req.user._id }
      ]
    }).sort({ createdAt: 1 });
    
    // Mark messages as read if user is the receiver
    await Message.updateMany(
      { sender: userId, receiver: req.user._id, read: false },
      { read: true }
    );
    
    res.json(messages);
  } catch (error) {
    console.error('Get conversation error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get all user conversations
exports.getUserConversations = async (req, res) => {
  try {
    // Get all messages where user is sender or receiver
    const messages = await Message.find({
      $or: [
        { sender: req.user._id },
        { receiver: req.user._id }
      ]
    }).sort({ createdAt: -1 });
    
    // Extract unique conversation partners
    const conversationPartners = new Set();
    messages.forEach(message => {
      if (message.sender.toString() === req.user._id.toString()) {
        conversationPartners.add(message.receiver.toString());
      } else {
        conversationPartners.add(message.sender.toString());
      }
    });
    
    // Get basic info about each conversation partner
    const conversations = await Promise.all(
      Array.from(conversationPartners).map(async (partnerId) => {
        const partner = await User.findById(partnerId).select('name role bloodGroup');
        
        // Get last message in this conversation
        const lastMessage = messages.find(message => 
          (message.sender.toString() === partnerId && message.receiver.toString() === req.user._id.toString()) ||
          (message.sender.toString() === req.user._id.toString() && message.receiver.toString() === partnerId)
        );
        
        // Count unread messages
        const unreadCount = await Message.countDocuments({
          sender: partnerId,
          receiver: req.user._id,
          read: false
        });
        
        return {
          partner: {
            _id: partnerId,
            name: partner?.name || 'Unknown User',
            role: partner?.role || 'unknown',
            bloodGroup: partner?.bloodGroup || 'unknown'
          },
          lastMessage: {
            content: lastMessage?.content || '',
            createdAt: lastMessage?.createdAt || null,
            sender: lastMessage?.sender.toString() === req.user._id.toString() ? 'You' : 'Partner'
          },
          unreadCount
        };
      })
    );
    
    res.json(conversations);
  } catch (error) {
    console.error('Get user conversations error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get unread messages count
exports.getUnreadCount = async (req, res) => {
  try {
    const count = await Message.countDocuments({
      receiver: req.user._id,
      read: false
    });
    
    res.json({ unreadCount: count });
  } catch (error) {
    console.error('Get unread count error:', error);
    res.status(500).json({ message: error.message });
  }
};