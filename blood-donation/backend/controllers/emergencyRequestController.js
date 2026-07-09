// // controllers/emergencyRequestController.js
// const BloodRequest = require('../models/BloodRequest');
// const User = require('../models/User');
// const nodemailer = require('nodemailer');

// // Configure email transporter (use your existing setup)
// let transporter; // Use your existing nodemailer setup

// // Blood type compatibility mapping
// const bloodCompatibility = {
//   'A+': ['A+', 'A-', 'O+', 'O-'],
//   'A-': ['A-', 'O-'],
//   'B+': ['B+', 'B-', 'O+', 'O-'],
//   'B-': ['B-', 'O-'],
//   'AB+': ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
//   'AB-': ['A-', 'B-', 'AB-', 'O-'],
//   'O+': ['O+', 'O-'],
//   'O-': ['O-']
// };

// // Create emergency blood request
// const createEmergencyRequest = async (req, res) => {
//   try {
//     const { patientName, bloodGroup, units, hospital, location, coordinates, contactPhone, notes } = req.body;

//     const emergencyRequest = new BloodRequest({
//       requester: req.user._id,
//       patientName,
//       bloodGroup,
//       units,
//       hospital,
//       location,
//       coordinates,
//       contactPhone,
//       urgency: 'emergency',
//       notes
//     });

//     const savedRequest = await emergencyRequest.save();

//     // Find compatible donors
//     await notifyCompatibleDonors(savedRequest);

//     res.status(201).json({
//       message: 'Emergency request created successfully',
//       request: savedRequest
//     });
//   } catch (error) {
//     console.error('Error creating emergency request:', error);
//     res.status(500).json({ message: 'Error creating emergency request' });
//   }
// };

// // Find and notify compatible donors
// const notifyCompatibleDonors = async (request) => {
//   try {
//     // Get compatible blood types
//     const compatibleTypes = bloodCompatibility[request.bloodGroup];

//     // Find donors with compatible blood types who have enabled emergency alerts
//     const compatibleDonors = await User.find({
//       role: 'donor',
//       bloodGroup: { $in: compatibleTypes },
//       emergencyAlerts: true,
//       availability: 'Available'
//     });

//     // Store notified donors
//     const notifiedDonorIds = [];

//     // Send notifications to compatible donors
//     for (const donor of compatibleDonors) {
//       // Send email notification
//       const emailSent = await sendEmergencyEmail(donor, request);
      
//       if (emailSent) {
//         notifiedDonorIds.push(donor._id);
//       }

//       // Here you would also implement push notifications, SMS, etc.
//     }

//     // Update the request with notified donors
//     await BloodRequest.findByIdAndUpdate(
//       request._id,
//       { $set: { notifiedDonors: notifiedDonorIds } }
//     );

//     return notifiedDonorIds.length;
//   } catch (error) {
//     console.error('Error notifying donors:', error);
//     return 0;
//   }
// };

// // Send emergency email to donor
// const sendEmergencyEmail = async (donor, request) => {
//   try {
//     const message = {
//       from: 'emergency@blooddonation.com',
//       to: donor.email,
//       subject: `URGENT: Emergency Blood Request for ${request.bloodGroup}`,
//       html: `
//         <h1>Emergency Blood Request</h1>
//         <p>Dear ${donor.name},</p>
//         <p>There is an urgent need for ${request.bloodGroup} blood at ${request.hospital}.</p>
//         <p><strong>Patient:</strong> ${request.patientName}</p>
//         <p><strong>Units Needed:</strong> ${request.units}</p>
//         <p><strong>Location:</strong> ${request.location}</p>
//         <p><strong>Contact:</strong> ${request.contactPhone}</p>
//         <p><strong>Notes:</strong> ${request.notes || 'N/A'}</p>
//         <p>Your blood type is compatible with the patient's needs. If you can donate, please contact the number above or respond through the app.</p>
//         <p>Thank you for your lifesaving help!</p>
//       `
//     };

//     await transporter.sendMail(message);
//     return true;
//   } catch (error) {
//     console.error('Error sending emergency email:', error);
//     return false;
//   }
// };

// // Get all emergency requests
// const getEmergencyRequests = async (req, res) => {
//   try {
//     const emergencyRequests = await BloodRequest.find({
//       urgency: 'emergency',
//       status: 'pending',
//       expiresAt: { $gt: new Date() }
//     })
//     .populate('requester', 'name email')
//     .sort({ createdAt: -1 });

//     res.json(emergencyRequests);
//   } catch (error) {
//     console.error('Error fetching emergency requests:', error);
//     res.status(500).json({ message: 'Error fetching emergency requests' });
//   }
// };

// // Get emergency requests for compatible donors
// const getCompatibleEmergencyRequests = async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id);
    
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Find blood types that can receive from this donor
//     const canDonateTo = Object.entries(bloodCompatibility)
//       .filter(([_, compatibleTypes]) => compatibleTypes.includes(user.bloodGroup))
//       .map(([bloodType, _]) => bloodType);

//     const emergencyRequests = await BloodRequest.find({
//       urgency: 'emergency',
//       status: 'pending',
//       bloodGroup: { $in: canDonateTo },
//       expiresAt: { $gt: new Date() }
//     })
//     .populate('requester', 'name email')
//     .sort({ createdAt: -1 });

//     res.json(emergencyRequests);
//   } catch (error) {
//     console.error('Error fetching compatible emergency requests:', error);
//     res.status(500).json({ message: 'Error fetching compatible emergency requests' });
//   }
// };

// module.exports = {
//   createEmergencyRequest,
//   getEmergencyRequests,
//   getCompatibleEmergencyRequests
// };


//new one

// // controllers/emergencyRequestController.js
// const BloodRequest = require('../models/BloodRequest');
// const User = require('../models/User');
// const nodemailer = require('nodemailer');

// // Configure email transporter
// let transporter;

// // Setup test email account
// async function setupMailer() {
//   try {
//     // Create test account
//     const testAccount = await nodemailer.createTestAccount();
    
//     // Create transporter
//     transporter = nodemailer.createTransport({
//       host: 'smtp.ethereal.email',
//       port: 587,
//       secure: false,
//       auth: {
//         user: testAccount.user,
//         pass: testAccount.pass
//       }
//     });
    
//     console.log('Email test account created:', testAccount.user);
//   } catch (error) {
//     console.error('Error setting up email:', error);
//   }
// }

// // Initialize mailer
// setupMailer();

// // Blood type compatibility mapping
// const bloodCompatibility = {
//   'A+': ['A+', 'A-', 'O+', 'O-'],
//   'A-': ['A-', 'O-'],
//   'B+': ['B+', 'B-', 'O+', 'O-'],
//   'B-': ['B-', 'O-'],
//   'AB+': ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
//   'AB-': ['A-', 'B-', 'AB-', 'O-'],
//   'O+': ['O+', 'O-'],
//   'O-': ['O-']
// };

// // Create emergency blood request
// const createEmergencyRequest = async (req, res) => {
//   try {
//     const { patientName, bloodGroup, units, hospital, location, coordinates, contactPhone, notes } = req.body;

//     const emergencyRequest = new BloodRequest({
//       requester: req.user._id,
//       patientName,
//       bloodGroup,
//       units,
//       hospital,
//       location,
//       coordinates,
//       contactPhone,
//       urgency: 'emergency',
//       notes
//     });

//     const savedRequest = await emergencyRequest.save();

//     // Find compatible donors
//     await notifyCompatibleDonors(savedRequest);

//     res.status(201).json({
//       message: 'Emergency request created successfully',
//       request: savedRequest
//     });
//   } catch (error) {
//     console.error('Error creating emergency request:', error);
//     res.status(500).json({ message: 'Error creating emergency request' });
//   }
// };

// // Find and notify compatible donors
// const notifyCompatibleDonors = async (request) => {
//   try {
//     // Get compatible blood types
//     const compatibleTypes = bloodCompatibility[request.bloodGroup];

//     // Find donors with compatible blood types who have enabled emergency alerts
//     const compatibleDonors = await User.find({
//       role: 'donor',
//       bloodGroup: { $in: compatibleTypes },
//       emergencyAlerts: true,
//       availability: 'Available'
//     });

//     // Store notified donors
//     const notifiedDonorIds = [];

//     // Send notifications to compatible donors
//     for (const donor of compatibleDonors) {
//       // Send email notification
//       const emailSent = await sendEmergencyEmail(donor, request);
      
//       if (emailSent) {
//         notifiedDonorIds.push(donor._id);
//       }

//       // Here you would also implement push notifications, SMS, etc.
//     }

//     // Update the request with notified donors
//     await BloodRequest.findByIdAndUpdate(
//       request._id,
//       { $set: { notifiedDonors: notifiedDonorIds } }
//     );

//     return notifiedDonorIds.length;
//   } catch (error) {
//     console.error('Error notifying donors:', error);
//     return 0;
//   }
// };

// // Send emergency email to donor
// const sendEmergencyEmail = async (donor, request) => {
//   try {
//     const message = {
//       from: 'emergency@blooddonation.com',
//       to: donor.email,
//       subject: `URGENT: Emergency Blood Request for ${request.bloodGroup}`,
//       html: `
//         <h1>Emergency Blood Request</h1>
//         <p>Dear ${donor.name},</p>
//         <p>There is an urgent need for ${request.bloodGroup} blood at ${request.hospital}.</p>
//         <p><strong>Patient:</strong> ${request.patientName}</p>
//         <p><strong>Units Needed:</strong> ${request.units}</p>
//         <p><strong>Location:</strong> ${request.location}</p>
//         <p><strong>Contact:</strong> ${request.contactPhone}</p>
//         <p><strong>Notes:</strong> ${request.notes || 'N/A'}</p>
//         <p>Your blood type is compatible with the patient's needs. If you can donate, please contact the number above or respond through the app.</p>
//         <p>Thank you for your lifesaving help!</p>
//       `
//     };

//     await transporter.sendMail(message);
//     return true;
//   } catch (error) {
//     console.error('Error sending emergency email:', error);
//     return false;
//   }
// };

// // Get all emergency requests
// const getEmergencyRequests = async (req, res) => {
//   try {
//     const emergencyRequests = await BloodRequest.find({
//       urgency: 'emergency',
//       status: 'pending',
//       expiresAt: { $gt: new Date() }
//     })
//     .populate('requester', 'name email')
//     .sort({ createdAt: -1 });

//     res.json(emergencyRequests);
//   } catch (error) {
//     console.error('Error fetching emergency requests:', error);
//     res.status(500).json({ message: 'Error fetching emergency requests' });
//   }
// };

// // Get emergency requests for compatible donors
// const getCompatibleEmergencyRequests = async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id);
    
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Find blood types that can receive from this donor
//     const canDonateTo = Object.entries(bloodCompatibility)
//       .filter(([_, compatibleTypes]) => compatibleTypes.includes(user.bloodGroup))
//       .map(([bloodType, _]) => bloodType);

//     const emergencyRequests = await BloodRequest.find({
//       urgency: 'emergency',
//       status: 'pending',
//       bloodGroup: { $in: canDonateTo },
//       expiresAt: { $gt: new Date() }
//     })
//     .populate('requester', 'name email')
//     .sort({ createdAt: -1 });

//     res.json(emergencyRequests);
//   } catch (error) {
//     console.error('Error fetching compatible emergency requests:', error);
//     res.status(500).json({ message: 'Error fetching compatible emergency requests' });
//   }
// };

// module.exports = {
//   createEmergencyRequest,
//   getEmergencyRequests,
//   getCompatibleEmergencyRequests
// };





//new one with nodemailer setup
// const BloodRequest = require('../models/BloodRequest');
// const User = require('../models/User');
// const nodemailer = require('nodemailer');

// // Blood type compatibility
// const bloodCompatibility = {
//   'A+': ['A+', 'A-', 'O+', 'O-'],
//   'A-': ['A-', 'O-'],
//   'B+': ['B+', 'B-', 'O+', 'O-'],
//   'B-': ['B-', 'O-'],
//   'AB+': ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
//   'AB-': ['A-', 'B-', 'AB-', 'O-'],
//   'O+': ['O+', 'O-'],
//   'O-': ['O-']
// };

// // Configure email transporter (Ethereal test)
// let transporter;

// async function setupMailer() {
//   try {
//     const testAccount = await nodemailer.createTestAccount();
//     transporter = nodemailer.createTransport({
//       host: 'smtp.ethereal.email',
//       port: 587,
//       secure: false,
//       auth: {
//         user: testAccount.user,
//         pass: testAccount.pass
//       }
//     });
//     console.log('📧 Test mailer ready:', testAccount.user);
//   } catch (error) {
//     console.error('Mailer setup failed:', error);
//   }
// }

// setupMailer();

// // 1. Create Emergency Request
// const createEmergencyRequest = async (req, res) => {
//   try {
//     const {
//       patientName, bloodGroup, units, hospital,
//       location, coordinates, contactPhone, notes
//     } = req.body;

//     const emergencyRequest = new BloodRequest({
//       requester: req.user._id,
//       patientName,
//       bloodGroup,
//       units,
//       hospital,
//       location,
//       coordinates,
//       contactPhone,
//       urgency: 'emergency',
//       notes
//     });

//     const savedRequest = await emergencyRequest.save();

//     await notifyCompatibleDonors(savedRequest);

//     res.status(201).json({
//       message: '✅ Emergency request created successfully',
//       request: savedRequest
//     });
//   } catch (error) {
//     console.error('❌ Error creating emergency request:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // 2. Notify Compatible Donors
// const notifyCompatibleDonors = async (request) => {
//   try {
//     const compatibleTypes = bloodCompatibility[request.bloodGroup];

//     const compatibleDonors = await User.find({
//       role: 'donor',
//       bloodGroup: { $in: compatibleTypes },
//       emergencyAlerts: true,
//       availability: 'Available'
//     });

//     const notifiedDonorIds = [];

//     for (const donor of compatibleDonors) {
//       const emailSent = await sendEmergencyEmail(donor, request);
//       if (emailSent) notifiedDonorIds.push(donor._id);
//     }

//     await BloodRequest.findByIdAndUpdate(
//       request._id,
//       { $set: { notifiedDonors: notifiedDonorIds } }
//     );

//     return notifiedDonorIds.length;
//   } catch (error) {
//     console.error('❌ Error notifying donors:', error);
//     return 0;
//   }
// };

// // 3. Send Email to One Donor
// const sendEmergencyEmail = async (donor, request) => {
//   try {
//     const message = {
//       from: 'emergency@blooddonation.com',
//       to: donor.email,
//       subject: `🚨 URGENT: Blood Request for ${request.bloodGroup}`,
//       html: `
//         <h2>Emergency Blood Request</h2>
//         <p>Hi ${donor.name},</p>
//         <p>We urgently need <strong>${request.bloodGroup}</strong> blood for:</p>
//         <ul>
//           <li><strong>Patient:</strong> ${request.patientName}</li>
//           <li><strong>Hospital:</strong> ${request.hospital}</li>
//           <li><strong>Units:</strong> ${request.units}</li>
//           <li><strong>Location:</strong> ${request.location}</li>
//           <li><strong>Contact:</strong> ${request.contactPhone}</li>
//         </ul>
//         <p>Please respond via app or contact above. Your donation can save a life!</p>
//         <p>❤️ Thank you, BloodCare Team</p>
//       `
//     };

//     await transporter.sendMail(message);
//     return true;
//   } catch (error) {
//     console.error(`❌ Email send failed to ${donor.email}:`, error);
//     return false;
//   }
// };

// // 4. Get All Emergency Requests (Admin/Staff)
// const getEmergencyRequests = async (req, res) => {
//   try {
//     const emergencyRequests = await BloodRequest.find({
//       urgency: 'emergency',
//       status: 'pending',
//       expiresAt: { $gt: new Date() }
//     })
//       .populate('requester', 'name email')
//       .sort({ createdAt: -1 });

//     res.json(emergencyRequests);
//   } catch (error) {
//     console.error('❌ Error fetching emergency requests:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // 5. Get Compatible Emergency Requests (Donor)
// const getCompatibleEmergencyRequests = async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id);
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     const canDonateTo = Object.entries(bloodCompatibility)
//       .filter(([_, compatible]) => compatible.includes(user.bloodGroup))
//       .map(([type]) => type);

//     const requests = await BloodRequest.find({
//       urgency: 'emergency',
//       status: 'pending',
//       bloodGroup: { $in: canDonateTo },
//       expiresAt: { $gt: new Date() }
//     })
//       .populate('requester', 'name email')
//       .sort({ createdAt: -1 });

//     res.json(requests);
//   } catch (error) {
//     console.error('❌ Error fetching compatible requests:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// module.exports = {
//   createEmergencyRequest,
//   getEmergencyRequests,
//   getCompatibleEmergencyRequests
// };




// const BloodRequest = require('../models/BloodRequest');
// const User = require('../models/User');
// const nodemailer = require('nodemailer');

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS
//   }
// });

// const bloodCompatibility = {
//   'A+': ['A+', 'A-', 'O+', 'O-'],
//   'A-': ['A-', 'O-'],
//   'B+': ['B+', 'B-', 'O+', 'O-'],
//   'B-': ['B-', 'O-'],
//   'AB+': ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
//   'AB-': ['A-', 'B-', 'AB-', 'O-'],
//   'O+': ['O+', 'O-'],
//   'O-': ['O-']
// };

// const createEmergencyRequest = async (req, res) => {
//   try {
//     const { patientName, bloodGroup, units, hospital, location, coordinates, contactPhone, notes } = req.body;

//     const emergencyRequest = new BloodRequest({
//       requester: req.user._id,
//       patientName,
//       bloodGroup,
//       units,
//       hospital,
//       location,
//       coordinates,
//       contactPhone,
//       urgency: 'emergency',
//       notes
//     });

//     const savedRequest = await emergencyRequest.save();

//     // Notify compatible donors
//     await notifyCompatibleDonors(savedRequest);

//     res.status(201).json({
//       message: 'Emergency request created and donors notified.',
//       request: savedRequest
//     });
//   } catch (error) {
//     console.error('Error creating emergency request:', error);
//     res.status(500).json({ message: 'Error creating emergency request' });
//   }
// };

// const notifyCompatibleDonors = async (request) => {
//   try {
//     const compatibleTypes = bloodCompatibility[request.bloodGroup];

//     const compatibleDonors = await User.find({
//       role: 'donor',
//       bloodGroup: { $in: compatibleTypes },
//       emergencyAlerts: true,
//       availability: 'Available'
//     });

//     const notifiedDonorIds = [];

//     for (const donor of compatibleDonors) {
//       const emailSent = await sendEmergencyEmail(donor, request);
//       if (emailSent) notifiedDonorIds.push(donor._id);
//     }

//     await BloodRequest.findByIdAndUpdate(request._id, {
//       $set: { notifiedDonors: notifiedDonorIds }
//     });

//     return notifiedDonorIds.length;
//   } catch (error) {
//     console.error('Error notifying donors:', error);
//     return 0;
//   }
// };

// const sendEmergencyEmail = async (donor, request) => {
//   try {
//     const message = {
//       from: process.env.EMAIL_USER,
//       to: donor.email,
//       subject: `URGENT: Blood Needed (${request.bloodGroup})`,
//       html: `
//         <h3>Emergency Blood Request</h3>
//         <p><strong>Patient:</strong> ${request.patientName}</p>
//         <p><strong>Hospital:</strong> ${request.hospital}</p>
//         <p><strong>Blood Group:</strong> ${request.bloodGroup}</p>
//         <p><strong>Units Needed:</strong> ${request.units}</p>
//         <p><strong>Location:</strong> ${request.location}</p>
//         <p><strong>Contact:</strong> ${request.contactPhone}</p>
//         <p><strong>Notes:</strong> ${request.notes || 'None'}</p>
//         <p>Please respond if you can help. You are a potential match.</p>
//       `
//     };

//     await transporter.sendMail(message);
//     return true;
//   } catch (error) {
//     console.error('Email send error:', error);
//     return false;
//   }
// };

// const getEmergencyRequests = async (req, res) => {
//   try {
//     const emergencyRequests = await BloodRequest.find({
//       urgency: 'emergency',
//       status: 'pending',
//       expiresAt: { $gt: new Date() }
//     }).populate('requester', 'name email').sort({ createdAt: -1 });

//     res.json(emergencyRequests);
//   } catch (error) {
//     console.error('Fetching emergency requests failed:', error);
//     res.status(500).json({ message: 'Failed to get emergency requests' });
//   }
// };

// const getCompatibleEmergencyRequests = async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id);

//     const canDonateTo = Object.entries(bloodCompatibility)
//       .filter(([_, types]) => types.includes(user.bloodGroup))
//       .map(([type]) => type);

//     const emergencyRequests = await BloodRequest.find({
//       urgency: 'emergency',
//       status: 'pending',
//       bloodGroup: { $in: canDonateTo },
//       expiresAt: { $gt: new Date() }
//     }).populate('requester', 'name email').sort({ createdAt: -1 });

//     res.json(emergencyRequests);
//   } catch (error) {
//     console.error('Error finding compatible emergency requests:', error);
//     res.status(500).json({ message: 'Error fetching requests' });
//   }
// };

// module.exports = {
//   createEmergencyRequest,
//   getEmergencyRequests,
//   getCompatibleEmergencyRequests
// };





// //final
// const BloodRequest = require('../models/BloodRequest');
// const User = require('../models/User');
// const nodemailer = require('nodemailer');

// // Gmail transporter
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS
//   }
// });

// // Blood group compatibility mapping
// const bloodCompatibility = {
//   'A+': ['A+', 'A-', 'O+', 'O-'],
//   'A-': ['A-', 'O-'],
//   'B+': ['B+', 'B-', 'O+', 'O-'],
//   'B-': ['B-', 'O-'],
//   'AB+': ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
//   'AB-': ['A-', 'B-', 'AB-', 'O-'],
//   'O+': ['O+', 'O-'],
//   'O-': ['O-']
// };

// // @desc    Create an emergency blood request
// // @route   POST /api/emergency/create
// // @access  Private
// const createEmergencyRequest = async (req, res) => {
//   try {
//     const {
//       patientName,
//       bloodGroup,
//       units,
//       hospital,
//       location,
//       coordinates,
//       contactPhone,
//       notes
//     } = req.body;

//     const emergencyRequest = new BloodRequest({
//       requester: req.user._id,
//       patientName,
//       bloodGroup,
//       units,
//       hospital,
//       location,
//       coordinates,
//       contactPhone,
//       urgency: 'emergency',
//       notes
//     });

//     const savedRequest = await emergencyRequest.save();

//     // Notify compatible donors via email
//     const notifiedCount = await notifyCompatibleDonors(savedRequest);

//     res.status(201).json({
//       message: `Emergency request created. ${notifiedCount} donors notified.`,
//       request: savedRequest
//     });
//   } catch (error) {
//     console.error('Error creating emergency request:', error);
//     res.status(500).json({ message: 'Error creating emergency request' });
//   }
// };

// // Helper: Notify compatible donors via email
// const notifyCompatibleDonors = async (request) => {
//   try {
//     const compatibleTypes = bloodCompatibility[request.bloodGroup];

//     const compatibleDonors = await User.find({
//       role: 'donor',
//       bloodGroup: { $in: compatibleTypes },
//       emergencyAlerts: true,
//       availability: 'Available'
//     });

//     const notifiedDonorIds = [];

//     for (const donor of compatibleDonors) {
//       const emailSent = await sendEmergencyEmail(donor, request);
//       if (emailSent) notifiedDonorIds.push(donor._id);
//     }

//     await BloodRequest.findByIdAndUpdate(request._id, {
//       $set: { notifiedDonors: notifiedDonorIds }
//     });

//     return notifiedDonorIds.length;
//   } catch (error) {
//     console.error('Error notifying donors:', error);
//     return 0;
//   }
// };

// // Helper: Send emergency email to a single donor
// const sendEmergencyEmail = async (donor, request) => {
//   try {
//     const message = {
//       from: process.env.EMAIL_USER,
//       to: donor.email,
//       subject: `URGENT: Blood Needed (${request.bloodGroup})`,
//       html: `
//         <h3>Emergency Blood Request</h3>
//         <p><strong>Patient:</strong> ${request.patientName}</p>
//         <p><strong>Hospital:</strong> ${request.hospital}</p>
//         <p><strong>Blood Group:</strong> ${request.bloodGroup}</p>
//         <p><strong>Units Needed:</strong> ${request.units}</p>
//         <p><strong>Location:</strong> ${request.location}</p>
//         <p><strong>Contact:</strong> ${request.contactPhone}</p>
//         <p><strong>Notes:</strong> ${request.notes || 'None'}</p>
//         <p>You are a potential match. Please respond if you can donate.</p>
//       `
//     };

//     await transporter.sendMail(message);
//     return true;
//   } catch (error) {
//     console.error('Email send error:', error);
//     return false;
//   }
// };

// // @desc    Get all active emergency requests
// // @route   GET /api/emergency/all
// // @access  Private
// const getEmergencyRequests = async (req, res) => {
//   try {
//     const emergencyRequests = await BloodRequest.find({
//       urgency: 'emergency',
//       status: 'pending',
//       expiresAt: { $gt: new Date() }
//     }).populate('requester', 'name email').sort({ createdAt: -1 });

//     res.json(emergencyRequests);
//   } catch (error) {
//     console.error('Fetching emergency requests failed:', error);
//     res.status(500).json({ message: 'Failed to get emergency requests' });
//   }
// };

// // @desc    Get emergency requests compatible with logged-in donor
// // @route   GET /api/emergency/compatible
// // @access  Private
// const getCompatibleEmergencyRequests = async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id);

//     const canDonateTo = Object.entries(bloodCompatibility)
//       .filter(([_, types]) => types.includes(user.bloodGroup))
//       .map(([type]) => type);

//     const emergencyRequests = await BloodRequest.find({
//       urgency: 'emergency',
//       status: 'pending',
//       bloodGroup: { $in: canDonateTo },
//       expiresAt: { $gt: new Date() }
//     }).populate('requester', 'name email').sort({ createdAt: -1 });

//     res.json(emergencyRequests);
//   } catch (error) {
//     console.error('Error finding compatible emergency requests:', error);
//     res.status(500).json({ message: 'Error fetching requests' });
//   }
// };

// module.exports = {
//   createEmergencyRequest,
//   getEmergencyRequests,
//   getCompatibleEmergencyRequests
// };






//newwwwwwwwww
// controllers/emergencyRequestController.js
const User = require('../models/User');
const nodemailer = require('nodemailer');

// Quick Gmail transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const quickEmergencyAlert = async (req, res) => {
  const { bloodGroup, location, message } = req.body;

  try {
    const donors = await User.find({
      role: 'donor',
      bloodGroup,
      location,
      emergencyAlerts: true,
      availability: 'Available'
    });

    if (!donors.length) {
      return res.status(404).json({ message: 'No donors found' });
    }

    const sendMails = donors.map(donor => {
      return transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: donor.email,
        subject: '🚨 Urgent Blood Needed',
        html: `
          <h3>Urgent Blood Request</h3>
          <p><strong>From:</strong> ${req.user.name} (${req.user.email})</p>
          <p><strong>Blood Group:</strong> ${bloodGroup}</p>
          <p><strong>Location:</strong> ${location}</p>
          <p><strong>Message:</strong> ${message || 'Please respond if available'}</p>
        `
      });
    });

    await Promise.all(sendMails);

    res.status(200).json({ message: 'Notifications sent to donors' });
  } catch (error) {
    console.error('Quick alert error:', error);
    res.status(500).json({ message: 'Server error while sending alerts' });
  }
};

module.exports = { quickEmergencyAlert };
