// routes/bloodRoutes.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/verifyToken');

// Mock data storage (in a real app, use MongoDB)
let bloodRequests = [];
let donations = [];

// Get all blood requests
router.get('/requests', async (req, res) => {
  try {
    res.json(bloodRequests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a blood request
router.post('/request', async (req, res) => {
  try {
    const {
      name,
      bloodGroup,
      quantity,
      contact,
      hospital,
      location,
      reason,
      isUrgent
    } = req.body;

    // In a real app, save to MongoDB
    const newRequest = {
      id: Date.now().toString(),
      name,
      bloodGroup,
      quantity,
      contact,
      hospital,
      location,
      reason,
      isUrgent,
      date: new Date().toISOString(),
      status: 'Pending'
    };

    bloodRequests.push(newRequest);
    res.status(200).json(newRequest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Schedule a donation
router.post('/donate', protect, async (req, res) => {
  try {
    const { name, age, bloodType, date, phone } = req.body;
    
    // Validate age
    if (parseInt(age) < 18 || parseInt(age) > 65) {
      return res.status(400).json({ message: 'Age must be between 18 and 65 to donate blood.' });
    }

    // In a real app, save to MongoDB
    const newDonation = {
      id: Date.now().toString(),
      userId: req.user._id,
      name,
      age,
      bloodType,
      date,
      phone,
      status: 'Scheduled',
      createdAt: new Date().toISOString()
    };

    donations.push(newDonation);
    res.status(201).json(newDonation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user's donations
router.get('/donations', protect, async (req, res) => {
  try {
    const userDonations = donations.filter(donation => 
      donation.userId === req.user._id.toString()
    );
    res.json(userDonations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;