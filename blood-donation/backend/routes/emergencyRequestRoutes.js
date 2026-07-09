// // routes/emergencyRoutes.js
// const express = require('express');
// const router = express.Router();
// const { 
//   createEmergencyRequest, 
//   getEmergencyRequests, 
//   getCompatibleEmergencyRequests 
// } = require('../controllers/emergencyRequestController');
// const { protect } = require('../middleware/authMiddleware');

// // Protected routes
// router.post('/create', protect, createEmergencyRequest);
// router.get('/all', protect, getEmergencyRequests);
// router.get('/compatible', protect, getCompatibleEmergencyRequests);

// module.exports = router;


//new
// routes/emergencyRoutes.js
// const express = require('express');
// const router = express.Router();
// const { 
//   createEmergencyRequest, 
//   getEmergencyRequests, 
//   getCompatibleEmergencyRequests 
// } = require('../controllers/emergencyRequestController');
// const { protect } = require('../middleware/authMiddleware');

// // Protected routes
// router.post('/create', protect, createEmergencyRequest);
// router.get('/all', protect, getEmergencyRequests);
// router.get('/compatible', protect, getCompatibleEmergencyRequests);

// module.exports = router;


//new one 
// const express = require('express');
// const router = express.Router();
// const { quickEmergencyAlert } = require('../controllers/emergencyController');
// const { protect } = require('../middleware/authMiddleware');

// router.post('/quick-alert', protect, quickEmergencyAlert);

// module.exports = router;



// //newwwwww
// const express = require('express');
// const router = express.Router();
// const User = require('../models/User');
// const nodemailer = require('nodemailer');

// // Gmail transporter
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// // POST: /api/emergency/request
// router.post('/request', async (req, res) => {
//   const {
//     name,
//     bloodGroup,
//     units,
//     phone,
//     hospital,
//     location,
//     message,
//     isUrgent,
//   } = req.body;

//   try {
//     // Save request to DB if needed (optional)

//     if (isUrgent) {
//       // Find matching donors
//       const donors = await User.find({
//         bloodGroup,
//         role: 'donor',
//         availability: true,
//       });

//       // Notify each donor by email
//       for (const donor of donors) {
//         await transporter.sendMail({
//           from: process.env.EMAIL_USER,
//           to: donor.email,
//           subject: '🚨 Urgent Blood Request',
//           html: `
//             <h3>Urgent Blood Needed</h3>
//             <p><strong>Name:</strong> ${name}</p>
//             <p><strong>Blood Group:</strong> ${bloodGroup}</p>
//             <p><strong>Units:</strong> ${units}</p>
//             <p><strong>Hospital:</strong> ${hospital}</p>
//             <p><strong>Location:</strong> ${location}</p>
//             <p><strong>Message:</strong> ${message}</p>
//             <p><strong>Contact:</strong> ${phone}</p>
//           `,
//         });
//       }
//     }

//     res.status(200).json({ message: 'Request submitted and notifications sent if urgent' });
//   } catch (error) {
//     console.error('Emergency request error:', error);
//     res.status(500).json({ message: 'Error sending request' });
//   }
// });

// module.exports = router;




//newwww one 
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const EmergencyRequest = require('../models/EmergencyRequest');
const nodemailer = require('nodemailer');

// Gmail transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// POST: /api/emergency/request
router.post('/request', async (req, res) => {
  const {
    name,
    bloodGroup,
    units,
    phone,
    hospital,
    location,
    message,
    isUrgent,
  } = req.body;

  try {
    // Save the request to MongoDB
    const newRequest = new EmergencyRequest({
      name,
      bloodGroup,
      units,
      phone,
      hospital,
      location,
      message,
      isUrgent,
    });
    await newRequest.save();

    // Send email alerts to donors if urgent
    if (isUrgent) {
      const donors = await User.find({
        bloodGroup,
        role: 'donor',
        availability: true,
      });

      for (const donor of donors) {
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: donor.email,
          subject: '🚨 Urgent Blood Request',
          html: `
            <h3>Urgent Blood Needed</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Blood Group:</strong> ${bloodGroup}</p>
            <p><strong>Units:</strong> ${units}</p>
            <p><strong>Hospital:</strong> ${hospital}</p>
            <p><strong>Location:</strong> ${location}</p>
            <p><strong>Message:</strong> ${message}</p>
            <p><strong>Contact:</strong> ${phone}</p>
          `,
        });
      }
    }

    res.status(200).json({ message: 'Request saved and emails sent if urgent' });
  } catch (error) {
    console.error('Emergency request error:', error);
    res.status(500).json({ message: 'Error sending request' });
  }
});

// GET: /api/emergency/request – fetch for frontend
router.get('/request', async (req, res) => {
  try {
    const requests = await EmergencyRequest.find().sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    console.error('Error fetching requests:', error);
    res.status(500).json({ message: 'Failed to fetch emergency requests' });
  }
});

module.exports = router;
