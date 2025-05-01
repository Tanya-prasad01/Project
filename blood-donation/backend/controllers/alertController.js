// controllers/alertController.js
const Alert = require('../models/Alert');

// Get user alerts
exports.getUserAlerts = async (req, res) => {
  try {
    const alerts = await Alert.find({ recipients: req.user._id })
      .populate('bloodRequest', 'bloodGroup hospital location isUrgent')
      .sort({ sentAt: -1 });
    
    res.json(alerts);
  } catch (error) {
    console.error('Get user alerts error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Mark alert as read
exports.markAlertAsRead = async (req, res) => {
  try {
    const alert = await Alert.findById(req.params.id);
    
    if (!alert) {
      return res.status(404).json({ message: 'Alert not found' });
    }
    
    // Verify user is a recipient
    if (!alert.recipients.includes(req.user._id)) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    
    alert.status = 'Read';
    const updatedAlert = await alert.save();
    
    res.json(updatedAlert);
  } catch (error) {
    console.error('Mark alert as read error:', error);
    res.status(500).json({ message: error.message });
  }
};