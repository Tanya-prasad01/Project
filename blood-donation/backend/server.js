// // const chatbotRoutes = require('./routes/chatbotRoutes');
// // const chatbotRoutes = require('./routes/chatbotRoutes');

// // const express = require('express');
// // const cors = require('cors');
// // const dotenv = require('dotenv');
// // const mongoose = require('mongoose');
// // const authRoutes = require('./routes/authRoutes');
// // const bloodRoutes = require('./routes/bloodRoutes');

// // dotenv.config();
// // const app = express();

// // // Middleware
// // app.use(cors());
// // app.use(express.json());

// // // Routes
// // app.use('/api/auth', authRoutes);
// // app.use('/api/blood', bloodRoutes);

// // // Connect to MongoDB
// // mongoose.connect(process.env.MONGO_URI)
// //   .then(() => {
// //     console.log('MongoDB Connected');
    
// //     // Start server
// //     const PORT = process.env.PORT || 5000;
// //     app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// //   })
// //   .catch(err => {
// //     console.error('MongoDB connection error:', err);
// //     process.exit(1);
// //   });

// // // Add chatbot routes
// // app.use('/api/chatbot', chatbotRoutes);

// // // Add chatbot routes
// // app.use('/api/chatbot', chatbotRoutes);
// //   // server.js
// // const express = require('express');
// // const cors = require('cors');
// // const dotenv = require('dotenv');
// // const mongoose = require('mongoose');
// // const authRoutes = require('./routes/authRoutes');
// // const donorRoutes = require('./routes/donorRoutes');
// // const bloodRequestRoutes = require('./routes/bloodRequestRoutes');
// // const chatRoutes = require('./routes/chatRoutes');
// // const alertRoutes = require('./routes/alertRoutes');
// // const path = require('path');

// // // Load environment variables
// // dotenv.config();

// // // Create Express app
// // const app = express();

// // // Middleware
// // app.use(cors());
// // app.use(express.json());

// // // Routes
// // app.use('/api/auth', authRoutes);
// // app.use('/api/donors', donorRoutes);
// // app.use('/api/blood-requests', bloodRequestRoutes);
// // app.use('/api/chat', chatRoutes);
// // app.use('/api/alerts', alertRoutes);

// // // MongoDB Connection
// // mongoose.connect(process.env.MONGO_URI)
// //   .then(() => console.log('MongoDB connected'))
// //   .catch((err) => console.error('MongoDB connection error:', err));

// // // Serve static assets in production
// // if (process.env.NODE_ENV === 'production') {
// //   app.use(express.static(path.join(__dirname, 'client/build')));
  
// //   app.get('*', (req, res) =>
// //     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
// //   );
// // }

// // // Start server
// // const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



// //server.js
// const express = require('express');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const { v4: uuidv4 } = require('uuid');
// const User = require('./models/User');
// const path = require('path');

// // Load environment variables
// dotenv.config();

// // Create Express app
// const app = express();

// // Middleware
// //  app.use(cors());
// app.use(cors({
//   origin: 'http://localhost:3000', // Your frontend URL
//   credentials: true // Allow credentials
// }));
// app.use(express.json());

// // MongoDB Connection
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log('MongoDB connected'))
//   .catch((err) => console.error('MongoDB connection error:', err));

// // Middleware to protect routes
// const protect = async (req, res, next) => {
//   let token;

//   if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
//     try {
//       // Get token from header
//       token = req.headers.authorization.split(' ')[1];

//       // Verify token
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);

//       // Get user from the token
//       req.user = await User.findById(decoded.id).select('-password');

//       next();
//     } catch (error) {
//       console.error('Auth middleware error:', error);
//       res.status(401).json({ message: 'Not authorized, token failed' });
//     }
//   }

//   if (!token) {
//     res.status(401).json({ message: 'Not authorized, no token' });
//   }
// };

// // Generate JWT
// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
// };

// // ====================
// // AUTH ROUTES
// // ====================

// // Registration
// app.post('/api/auth/register', async (req, res) => {
//   try {
//     const { name, email, phone, location, password, bloodGroup, role } = req.body;

//     if (!name || !email || !phone || !location || !password || !bloodGroup || !role) {
//       return res.status(400).json({ message: 'Please enter all fields' });
//     }

//     const existingUser = await User.findOne({ email });
//     if (existingUser) return res.status(400).json({ message: 'User already exists' });

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = new User({
//       name,
//       email,
//       phone,
//       location,
//       password: hashedPassword,
//       bloodGroup,
//       role,
//       coordinates: req.body.coordinates || null,
//       availability: 'Available',
//       lastDonation: null,
//       emergencyAlerts: true
//     });

//     await newUser.save();

//     res.status(201).json({ 
//       message: 'User registered successfully',
//       user: {
//         _id: newUser._id,
//         name: newUser.name,
//         email: newUser.email,
//         role: newUser.role,
//         bloodGroup: newUser.bloodGroup,
//         location: newUser.location,
//         phone: newUser.phone,
//         token: generateToken(newUser._id)
//       }
//     });
//   } catch (error) {
//     console.error('Registration error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Login
// app.post('/api/auth/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password)
//       return res.status(400).json({ message: 'Please enter all fields' });

//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ message: 'Invalid credentials' });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

//     res.status(200).json({
//       message: 'Login successful',
//       token: generateToken(user._id),
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         phone: user.phone,
//         location: user.location,
//         bloodGroup: user.bloodGroup,
//         role: user.role,
//       },
//     });
//   } catch (error) {
//     console.error('Login error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Get user profile
// app.get('/api/auth/profile', protect, async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id).select('-password');
    
//     if (user) {
//       res.json(user);
//     } else {
//       res.status(404).json({ message: 'User not found' });
//     }
//   } catch (error) {
//     console.error('Get profile error:', error);
//     res.status(500).json({ message: error.message });
//   }
// });

// // Update user profile
// app.put('/api/auth/profile', protect, async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id);
    
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }
    
//     user.name = req.body.name || user.name;
//     user.location = req.body.location || user.location;
//     user.phone = req.body.phone || user.phone;
    
//     // Only donors can update this
//     if (user.role === 'donor') {
//       user.availability = req.body.availability || user.availability;
//     }
    
//     // Only update bloodGroup if provided
//     if (req.body.bloodGroup) {
//       user.bloodGroup = req.body.bloodGroup;
//     }
    
//     // Only update coordinates if provided
//     if (req.body.coordinates) {
//       user.coordinates = req.body.coordinates;
//     }
    
//     // Update emergencyAlerts preference if provided
//     if (req.body.emergencyAlerts !== undefined) {
//       user.emergencyAlerts = req.body.emergencyAlerts;
//     }
    
//     // Update password if provided
//     if (req.body.password) {
//       user.password = await bcrypt.hash(req.body.password, 10);
//     }
    
//     const updatedUser = await user.save();
    
//     res.json({
//       _id: updatedUser._id,
//       name: updatedUser.name,
//       email: updatedUser.email,
//       role: updatedUser.role,
//       bloodGroup: updatedUser.bloodGroup,
//       location: updatedUser.location,
//       phone: updatedUser.phone,
//       availability: updatedUser.availability,
//       coordinates: updatedUser.coordinates,
//       emergencyAlerts: updatedUser.emergencyAlerts
//     });
//   } catch (error) {
//     console.error('Update profile error:', error);
//     res.status(500).json({ message: error.message });
//   }
// });

// // ====================
// // DONOR ROUTES
// // ====================

// // Search for donors
// app.get('/api/donors/search', async (req, res) => {
//   try {
//     const { bloodGroup, location, availability } = req.query;
    
//     // Base query: only return donors
//     const query = { role: 'donor' };
    
//     // Add filters if provided
//     if (bloodGroup) {
//       query.bloodGroup = bloodGroup;
//     }
    
//     if (location) {
//       // Simple text-based location search
//       query.location = { $regex: location, $options: 'i' };
//     }
    
//     if (availability) {
//       query.availability = availability;
//     }
    
//     const donors = await User.find(query)
//       .select('name bloodGroup location availability lastDonation phone')
//       .sort({ lastDonation: 1 }); // Sort by donation date (oldest first)
    
//     res.json(donors);
//   } catch (error) {
//     console.error('Search donors error:', error);
//     res.status(500).json({ message: error.message });
//   }
// });

// // ====================
// // BLOOD DONATION ROUTES
// // ====================

// // Schedule a donation
// app.post('/api/blood/donate', protect, async (req, res) => {
//   try {
//     const { name, age, bloodType, date, phone } = req.body;
    
//     // Validate age
//     if (parseInt(age) < 18 || parseInt(age) > 65) {
//       return res.status(400).json({ message: 'Age must be between 18 and 65 to donate blood.' });
//     }

//     // In a real app with MongoDB, you would create a Donation model
//     // For now, just return success with the donation data
//     res.status(201).json({
//       id: Date.now().toString(),
//       donor: req.user._id,
//       name,
//       age,
//       bloodType,
//       date,
//       phone,
//       status: 'Scheduled',
//       createdAt: new Date().toISOString()
//     });
//   } catch (error) {
//     console.error('Donation error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // ====================
// // BLOOD REQUEST ROUTES
// // ====================

// // All blood requests (temporary in-memory storage)
// const bloodRequests = [];

// // Create a blood request
// app.post('/api/blood/request', async (req, res) => {
//   try {
//     const {
//       name,
//       bloodGroup,
//       quantity,
//       contact,
//       hospital,
//       location,
//       reason,
//       isUrgent
//     } = req.body;

//     // Create a new request object
//     const newRequest = {
//       id: Date.now().toString(),
//       name,
//       bloodGroup,
//       quantity,
//       contact,
//       hospital,
//       location,
//       reason,
//       isUrgent,
//       date: new Date().toISOString(),
//       status: 'Pending'
//     };
    
//     // Store in our temporary array
//     bloodRequests.push(newRequest);

//     // If this is an urgent request, we would send alerts to matching donors
//     // (this would be implemented in a real app with proper models and notifications)
//     if (isUrgent) {
//       console.log(`Urgent blood request for ${bloodGroup} at ${hospital}`);
//       // Find matching donors and alert them
//     }

//     res.status(200).json(newRequest);
//   } catch (error) {
//     console.error('Blood request error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Get all blood requests
// app.get('/api/blood/requests', async (req, res) => {
//   try {
//     res.json(bloodRequests);
//   } catch (error) {
//     console.error('Get blood requests error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // ====================
// // CHATBOT ROUTES
// // ====================

// // Chatbot knowledge base
// const knowledgeBase = {
//   greeting: [
//     "Hello! I'm your Blood Donation Assistant. How can I help you today?",
//     "Hi there! I can help you with blood donation questions. What would you like to know?"
//   ],
  
//   eligibility: [
//     "To donate blood, you generally need to be at least 18 years old, weigh at least 110 pounds, and be in good health. There are some medical conditions and medications that may affect eligibility."
//   ],
  
//   process: [
//     "The blood donation process is simple: 1) Register and complete a health screening, 2) The actual donation takes about 10-15 minutes, 3) Afterward, you'll rest and enjoy refreshments for 15 minutes before leaving."
//   ],
  
//   bloodTypes: [
//     "There are 8 different blood types: A+, A-, B+, B-, AB+, AB-, O+, and O-. Type O- is the universal donor, while AB+ is the universal recipient."
//   ],
  
//   frequency: [
//     "Most people can donate whole blood every 56 days (8 weeks). Platelets can be donated every 7 days up to 24 times per year."
//   ],
  
//   preparation: [
//     "Before donating: 1) Drink plenty of water, 2) Eat a healthy meal, 3) Avoid fatty foods, 4) Get a good night's sleep, 5) Bring a valid ID."
//   ],
  
//   benefits: [
//     "Donating blood helps save lives, provides a free health screening, burns calories, reduces the risk of heart disease, and gives a sense of contribution to your community."
//   ],
  
//   timeRequired: [
//     "The entire process takes about 1 hour, though the actual blood donation only takes about 10-15 minutes."
//   ],
  
//   finding: [
//     "You can find donors by using our 'Search' feature. You can search by blood type, location, and availability."
//   ],
  
//   emergency: [
//     "For emergency blood needs, you can create an urgent request through our system, which will alert compatible donors in your area."
//   ],
  
//   requestingBlood: [
//     "To request blood, go to the 'Request Blood' page, fill out the form with details about the patient and blood requirements, and submit your request."
//   ],
  
//   donationAppointment: [
//     "To schedule a donation, go to the 'Donate' page and fill out the appointment form. You'll receive a confirmation and reminders."
//   ],
  
//   fallback: [
//     "I'm sorry, I don't have information on that topic. Would you like to ask about eligibility, the donation process, blood types, or how to request blood?",
//     "I don't understand that question. Try asking about blood donation eligibility, the donation process, or how to use our platform."
//   ]
// };

// // Intent matching patterns
// const patterns = {
//   greeting: /\b(hi|hello|hey|greetings|howdy|good (morning|afternoon|evening))\b/i,
//   eligibility: /\b(eligib|requirements|who can donate|can i donate|qualif|criteria)\b/i,
//   process: /\b(process|how (to|does) donat|procedure|steps|what happens)\b/i,
//   bloodTypes: /\b(blood type|types of blood|different blood|compatible|o\-|a\+|b\-)\b/i,
//   frequency: /\b(how (often|frequently)|how many times|frequency|wait between)\b/i,
//   preparation: /\b(prepare|ready|before donat|preparation|what should i do)\b/i,
//   benefits: /\b(benefit|advantage|good|positive|help|impact)\b/i,
//   timeRequired: /\b(how long|time|duration|how much time|minutes|hours)\b/i,
//   finding: /\b(find|search|locate|available|donors near|where)\b/i,
//   emergency: /\b(emergency|urgent|critical|immediate|quickly)\b/i,
//   requestingBlood: /\b(request|need blood|get blood|receive|recipient)\b/i,
//   donationAppointment: /\b(schedule|appointment|book|when can i|sign up)\b/i
// };

// // Match user input to intent
// const matchIntent = (input) => {
//   for (const [intent, pattern] of Object.entries(patterns)) {
//     if (pattern.test(input)) {
//       return intent;
//     }
//   }
//   return 'fallback';
// };

// // Generate bot response
// const generateResponse = (intent) => {
//   const responses = knowledgeBase[intent] || knowledgeBase.fallback;
//   return responses[Math.floor(Math.random() * responses.length)];
// };

// // Store chatbot conversations (temporary in-memory storage)
// const chatbotConversations = [];

// // Chat with the bot
// app.post('/api/chatbot/chat', async (req, res) => {
//   try {
//     const { message, sessionId } = req.body;
//     let conversation;
    
//     // Get or create conversation
//     if (sessionId) {
//       conversation = chatbotConversations.find(c => c.sessionId === sessionId);
//     }
    
//     if (!conversation) {
//       // Create new conversation
//       conversation = {
//         sessionId: sessionId || uuidv4(),
//         userId: req.user ? req.user._id : null,
//         messages: [],
//         createdAt: new Date().toISOString(),
//         lastActivity: new Date().toISOString()
//       };
//       chatbotConversations.push(conversation);
//     }
    
//     // Add user message
//     conversation.messages.push({
//       sender: 'user',
//       content: message,
//       timestamp: new Date().toISOString()
//     });
    
//     // Generate bot response
//     const intent = matchIntent(message);
//     const botResponse = generateResponse(intent);
    
//     // Add bot response
//     conversation.messages.push({
//       sender: 'bot',
//       content: botResponse,
//       timestamp: new Date().toISOString()
//     });
    
//     // Update last activity
//     conversation.lastActivity = new Date().toISOString();
    
//     res.json({
//       sessionId: conversation.sessionId,
//       response: botResponse,
//       messages: conversation.messages
//     });
//   } catch (error) {
//     console.error('Chatbot error:', error);
//     res.status(500).json({ message: error.message });
//   }
// });

// // Get conversation history
// app.get('/api/chatbot/conversation/:sessionId', async (req, res) => {
//   try {
//     const { sessionId } = req.params;
    
//     const conversation = chatbotConversations.find(c => c.sessionId === sessionId);
    
//     if (!conversation) {
//       return res.status(404).json({ message: 'Conversation not found' });
//     }   
//     res.json({
//       sessionId: conversation.sessionId,
//       messages: conversation.messages
//     });
//   } catch (error) {
//     console.error('Get conversation error:', error);
//     res.status(500).json({ message: error.message });
//   }
// });
// // Serve static assets in production
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, 'client/build')));
//   app.get('*', (req, res) =>
//     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
//   );
// }
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));






const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
// app.use(cors({
//   origin: '*', // Allow all origins for testing
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));
app.use(cors())
app.use(express.json());

// MongoDB Connection

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected successfully');
    console.log('Connected to database:', mongoose.connection.db.databaseName);
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    console.error('Using MONGO_URI:', process.env.MONGO_URI ? 'URI is set' : 'URI is not set');
    if (err.name === 'MongoNetworkError') {
      console.error('Could not connect to MongoDB. Check your internet connection and MongoDB URI.');
    }
  });

/* mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log('MongoDB connected successfully'))
//   .catch((err) => {
//     console.error('MongoDB connection error:', err);
//     if (err.name === 'MongoNetworkError') {
//       console.error('Could not connect to MongoDB. Check your internet connection and MongoDB URI.');
//     }
//   });
*/

// User Model Schema
const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  phone: { 
    type: String, 
    required: true 
  },
  location: { 
    type: String, 
    required: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  bloodGroup: { 
    type: String, 
    required: true 
  },
  role: { 
    type: String, 
    enum: ['donor', 'receiver'], 
    required: true 
  },
  lastDonation: {
    type: Date,
    default: null
  },
  availability: {
    type: String,
    default: 'Available'
  },
  coordinates: {
    type: {
      lat: Number,
      lng: Number
    },
    default: null
  },
  emergencyAlerts: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', userSchema);

// Middleware to protect routes
const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];
      console.log('Token received:', token);

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Token verified, user ID:', decoded.id);

      // Get user from the token
      req.user = await User.findById(decoded.id).select('-password');
      if (!req.user) {
        console.log('User not found with ID:', decoded.id);
        return res.status(404).json({ message: 'User not found' });
      }

      next();
    } catch (error) {
      console.error('Auth middleware error:', error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    console.log('No authorization header found');
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// ====================
// AUTH ROUTES
// ====================

// Registration
app.post('/api/auth/register', async (req, res) => {
  try {
    console.log('Registration request received:', req.body);
    
    const { name, email, phone, location, password, bloodGroup, role } = req.body;

    if (!name || !email || !phone || !location || !password || !bloodGroup || !role) {
      console.log('Missing fields:', { 
        name: !name, 
        email: !email, 
        phone: !phone, 
        location: !location, 
        password: !password, 
        bloodGroup: !bloodGroup, 
        role: !role 
      });
      return res.status(400).json({ message: 'Please enter all fields' });
    }

    const existingUser = await User.findOne({ email });
    console.log('User already exists?', !!existingUser);
    
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Password hashed successfully');

    const newUser = new User({
      name,
      email,
      phone,
      location,
      password: hashedPassword,
      bloodGroup,
      role,
      availability: 'Available',
      lastDonation: null,
      emergencyAlerts: true
    });

    await newUser.save();
    console.log('User saved successfully with ID:', newUser._id);

    res.status(201).json({ 
      message: 'User registered successfully',
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        bloodGroup: newUser.bloodGroup,
        token: generateToken(newUser._id)
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  try {
    console.log('Login request received:', req.body);
    
    const { email, password } = req.body;

    // Validate inputs
    if (!email || !password) {
      console.log('Missing email or password in request');
      return res.status(400).json({ message: 'Please enter all fields' });
    }

    // Find user
    const user = await User.findOne({ email });
    console.log('User found?', !!user);
    
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password match?', isMatch);
    
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = generateToken(user._id);

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        location: user.location,
        role: user.role,
        bloodGroup: user.bloodGroup,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user profile
app.get('/api/auth/profile', protect, async (req, res) => {
  try {
    console.log('Get profile request for user:', req.user._id);
    const user = await User.findById(req.user._id).select('-password');
    
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Update user profile
app.put('/api/auth/profile', protect, async (req, res) => {
  try {
    console.log('Update profile request:', req.body);
    const user = await User.findById(req.user._id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    user.name = req.body.name || user.name;
    user.location = req.body.location || user.location;
    user.phone = req.body.phone || user.phone;
    
    // Only donors can update this
    if (user.role === 'donor') {
      user.availability = req.body.availability || user.availability;
    }
    
    // Only update bloodGroup if provided
    if (req.body.bloodGroup) {
      user.bloodGroup = req.body.bloodGroup;
    }
    
    // Only update coordinates if provided
    if (req.body.coordinates) {
      user.coordinates = req.body.coordinates;
    }
    
    // Update emergencyAlerts preference if provided
    if (req.body.emergencyAlerts !== undefined) {
      user.emergencyAlerts = req.body.emergencyAlerts;
    }
    
    // Update password if provided
    if (req.body.password) {
      user.password = await bcrypt.hash(req.body.password, 10);
    }
    
    const updatedUser = await user.save();
    console.log('User updated successfully');
    
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      bloodGroup: updatedUser.bloodGroup,
      location: updatedUser.location,
      phone: updatedUser.phone,
      availability: updatedUser.availability,
      coordinates: updatedUser.coordinates,
      emergencyAlerts: updatedUser.emergencyAlerts
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: error.message });
  }
});

// ====================
// DONOR ROUTES
// ====================

// Search for donors
app.get('/api/donors/search', async (req, res) => {
  try {
    console.log('Search donors request:', req.query);
    const { bloodGroup, location, availability } = req.query;
    
    // Base query: only return donors
    const query = { role: 'donor' };
    
    // Add filters if provided
    if (bloodGroup) {
      query.bloodGroup = bloodGroup;
    }
    
    if (location) {
      // Simple text-based location search
      query.location = { $regex: location, $options: 'i' };
    }
    
    if (availability) {
      query.availability = availability;
    }
    
    const donors = await User.find(query)
      .select('name bloodGroup location availability lastDonation phone')
      .sort({ lastDonation: 1 }); // Sort by donation date (oldest first)
    
    console.log(`Found ${donors.length} matching donors`);
    res.json(donors);
  } catch (error) {
    console.error('Search donors error:', error);
    res.status(500).json({ message: error.message });
  }
});

// ====================
// BLOOD DONATION ROUTES
// ====================

// Donation Model Schema
const donationSchema = new mongoose.Schema({
  donor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  bloodType: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Scheduled', 'Completed', 'Cancelled'],
    default: 'Scheduled'
  },
  notes: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Donation = mongoose.model('Donation', donationSchema);

// Schedule a donation
app.post('/api/blood/donate', protect, async (req, res) => {
  try {
    console.log('Donation request received:', req.body);
    const { name, age, bloodType, date, phone, notes } = req.body;
    
    // Validate age
    if (parseInt(age) < 18 || parseInt(age) > 65) {
      return res.status(400).json({ message: 'Age must be between 18 and 65 to donate blood.' });
    }

    // Create donation record
    const newDonation = new Donation({
      donor: req.user._id,
      name,
      age: parseInt(age),
      bloodType,
      date: new Date(date),
      phone,
      notes: notes || "",
      status: 'Scheduled'
    });

    const savedDonation = await newDonation.save();
    console.log('Donation scheduled successfully');

    // Update user's last donation date and availability
    await User.findByIdAndUpdate(req.user._id, {
      lastDonation: date,
      availability: 'Available in 3 months'
    });

    res.status(201).json(savedDonation);
  } catch (error) {
    console.error('Donation error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's donations
app.get('/api/blood/my-donations', protect, async (req, res) => {
  try {
    console.log('Get donations request for user:', req.user._id);
    const donations = await Donation.find({ donor: req.user._id })
      .sort({ date: -1 });
    
    console.log(`Found ${donations.length} donations`);
    res.json(donations);
  } catch (error) {
    console.error('Get donations error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ====================
// BLOOD REQUEST ROUTES
// ====================

// Blood Request Model Schema
const bloodRequestSchema = new mongoose.Schema({
  requester: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  name: {
    type: String,
    required: true
  },
  bloodGroup: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  contact: {
    type: String,
    required: true
  },
  hospital: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  reason: {
    type: String,
    required: true
  },
  isUrgent: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['Pending', 'Fulfilled', 'Cancelled'],
    default: 'Pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const BloodRequest = mongoose.model('BloodRequest', bloodRequestSchema);

// Create a blood request
app.post('/api/blood/request', async (req, res) => {
  try {
    console.log('Blood request received:', req.body);
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

    // Validate required fields
    if (!name || !bloodGroup || !quantity || !contact || !hospital || !location || !reason) {
      return res.status(400).json({ message: 'Please fill all required fields' });
    }

    // Create a new request
    const newRequest = new BloodRequest({
      requester: req.user ? req.user._id : null,
      name,
      bloodGroup,
      quantity: parseInt(quantity),
      contact,
      hospital,
      location,
      reason,
      isUrgent: isUrgent || false
    });
    
    const savedRequest = await newRequest.save();
    console.log('Blood request created successfully');

    // If this is an urgent request, we would send alerts to matching donors
    // (in a real app with proper notification system)
    if (isUrgent) {
      console.log(`Urgent blood request for ${bloodGroup} at ${hospital}`);
      
      // Find matching donors (simplified)
      const matchingDonors = await User.find({
        role: 'donor',
        bloodGroup: bloodGroup,
        emergencyAlerts: true
      });
      
      console.log(`Found ${matchingDonors.length} matching donors for urgent request`);
      
      // In a real app, we would send notifications to these donors
    }

    res.status(201).json(savedRequest);
  } catch (error) {
    console.error('Blood request error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all blood requests
app.get('/api/blood/requests', async (req, res) => {
  try {
    console.log('Get all blood requests');
    const bloodRequests = await BloodRequest.find({})
      .sort({ createdAt: -1 });
    
    console.log(`Found ${bloodRequests.length} blood requests`);
    res.json(bloodRequests);
  } catch (error) {
    console.error('Get blood requests error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's blood requests
app.get('/api/blood/my-requests', protect, async (req, res) => {
  try {
    console.log('Get my blood requests for user:', req.user._id);
    const requests = await BloodRequest.find({ requester: req.user._id })
      .sort({ createdAt: -1 });
    
    console.log(`Found ${requests.length} requests`);
    res.json(requests);
  } catch (error) {
    console.error('Get my requests error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ====================
// CHATBOT ROUTES
// ====================

// Chatbot Conversation Schema
const chatbotConversationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  sessionId: {
    type: String,
    required: true
  },
  messages: [
    {
      sender: {
        type: String,
        enum: ['user', 'bot'],
        required: true
      },
      content: {
        type: String,
        required: true
      },
      timestamp: {
        type: Date,
        default: Date.now
      }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastActivity: {
    type: Date,
    default: Date.now
  }
});

const ChatbotConversation = mongoose.model('ChatbotConversation', chatbotConversationSchema);

// Chatbot knowledge base
const knowledgeBase = {
  greeting: [
    "Hello! I'm your Blood Donation Assistant. How can I help you today?",
    "Hi there! I can help you with blood donation questions. What would you like to know?"
  ],
  
  eligibility: [
    "To donate blood, you generally need to be at least 18 years old, weigh at least 110 pounds, and be in good health. There are some medical conditions and medications that may affect eligibility."
  ],
  
  process: [
    "The blood donation process is simple: 1) Register and complete a health screening, 2) The actual donation takes about 10-15 minutes, 3) Afterward, you'll rest and enjoy refreshments for 15 minutes before leaving."
  ],
  
  bloodTypes: [
    "There are 8 different blood types: A+, A-, B+, B-, AB+, AB-, O+, and O-. Type O- is the universal donor, while AB+ is the universal recipient."
  ],
  
  frequency: [
    "Most people can donate whole blood every 56 days (8 weeks). Platelets can be donated every 7 days up to 24 times per year."
  ],
  
  preparation: [
    "Before donating: 1) Drink plenty of water, 2) Eat a healthy meal, 3) Avoid fatty foods, 4) Get a good night's sleep, 5) Bring a valid ID."
  ],
  
  benefits: [
    "Donating blood helps save lives, provides a free health screening, burns calories, reduces the risk of heart disease, and gives a sense of contribution to your community."
  ],
  
  timeRequired: [
    "The entire process takes about 1 hour, though the actual blood donation only takes about 10-15 minutes."
  ],
  
  finding: [
    "You can find donors by using our 'Search' feature. You can search by blood type, location, and availability."
  ],
  
  emergency: [
    "For emergency blood needs, you can create an urgent request through our system, which will alert compatible donors in your area."
  ],
  
  requestingBlood: [
    "To request blood, go to the 'Request Blood' page, fill out the form with details about the patient and blood requirements, and submit your request."
  ],
  
  donationAppointment: [
    "To schedule a donation, go to the 'Donate' page and fill out the appointment form. You'll receive a confirmation and reminders."
  ],
  
  fallback: [
    "I'm sorry, I don't have information on that topic. Would you like to ask about eligibility, the donation process, blood types, or how to request blood?",
    "I don't understand that question. Try asking about blood donation eligibility, the donation process, or how to use our platform."
  ]
};

// Intent matching patterns
const patterns = {
  greeting: /\b(hi|hello|hey|greetings|howdy|good (morning|afternoon|evening))\b/i,
  eligibility: /\b(eligib|requirements|who can donate|can i donate|qualif|criteria)\b/i,
  process: /\b(process|how (to|does) donat|procedure|steps|what happens)\b/i,
  bloodTypes: /\b(blood type|types of blood|different blood|compatible|o\-|a\+|b\-)\b/i,
  frequency: /\b(how (often|frequently)|how many times|frequency|wait between)\b/i,
  preparation: /\b(prepare|ready|before donat|preparation|what should i do)\b/i,
  benefits: /\b(benefit|advantage|good|positive|help|impact)\b/i,
  timeRequired: /\b(how long|time|duration|how much time|minutes|hours)\b/i,
  finding: /\b(find|search|locate|available|donors near|where)\b/i,
  emergency: /\b(emergency|urgent|critical|immediate|quickly)\b/i,
  requestingBlood: /\b(request|need blood|get blood|receive|recipient)\b/i,
  donationAppointment: /\b(schedule|appointment|book|when can i|sign up)\b/i
};

// Match user input to intent
const matchIntent = (input) => {
  for (const [intent, pattern] of Object.entries(patterns)) {
    if (pattern.test(input)) {
      return intent;
    }
  }
  return 'fallback';
};

// Generate bot response
const generateResponse = (intent) => {
  const responses = knowledgeBase[intent] || knowledgeBase.fallback;
  return responses[Math.floor(Math.random() * responses.length)];
};

// Chat with the bot
app.post('/api/chatbot/chat', async (req, res) => {
  try {
    console.log('Chatbot message received:', req.body);
    const { message, sessionId } = req.body;
    let conversation;
    
    // Get or create conversation
    if (sessionId) {
      conversation = await ChatbotConversation.findOne({ sessionId });
    }
    
    if (!conversation) {
      // Create new conversation
      conversation = new ChatbotConversation({
        user: req.user ? req.user._id : null,
        sessionId: sessionId || uuidv4(),
        messages: []
      });
    }
    
    // Add user message
    conversation.messages.push({
      sender: 'user',
      content: message
    });
    
    // Generate bot response
    const intent = matchIntent(message);
    console.log('Detected intent:', intent);
    const botResponse = generateResponse(intent);
    
    // Add bot response
    conversation.messages.push({
      sender: 'bot',
      content: botResponse
    });
    
    // Update last activity
    conversation.lastActivity = Date.now();
    
    // Save conversation
    await conversation.save();
    console.log('Chatbot conversation saved');
    
    res.json({
      sessionId: conversation.sessionId,
      response: botResponse,
      messages: conversation.messages
    });
  } catch (error) {
    console.error('Chatbot error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Get conversation history
app.get('/api/chatbot/conversation/:sessionId', async (req, res) => {
  try {
    console.log('Get conversation history for session:', req.params.sessionId);
    const { sessionId } = req.params;
    
    const conversation = await ChatbotConversation.findOne({ sessionId });
    
    if (!conversation) {
      return res.status(404).json({ message: 'Conversation not found' });
    }
    
    res.json({
      sessionId: conversation.sessionId,
      messages: conversation.messages
    });
  } catch (error) {
    console.error('Get conversation error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));