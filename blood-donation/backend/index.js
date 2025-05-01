
// const express = require('express');
// const dotenv = require('dotenv');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const authRoutes = require('./routes/authRoutes');
// const app = express();

// // Middlewares
// dotenv.config();
// app.use(cors());
// app.use(express.json());

// // Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// }).then(() => console.log('MongoDB connected'))
//   .catch(err => console.error(err));

// // Routes
// app.use('/api/auth', authRoutes);

// // Run Server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// backend/index.js

// // Required packages
// const express = require('express');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const mongoose = require('mongoose');
// const User = require('./models/User');
// const bcrypt = require('bcryptjs'); // Add bcryptjs for password hashing


// // Configure environment variables
// dotenv.config();

// // Initialize the app
// const app = express();

// // Middleware
// app.use(cors()); // Enable Cross-Origin Requests
// app.use(express.json()); // Parse JSON requests

// // MongoDB Connection Setup
// // mongoose.connect(process.env.MONGO_URI, {
// //   useNewUrlParser: true,
// //   useUnifiedTopology: true,
// // }).then(() => {
// //   console.log('MongoDB connected');
// // }).catch((err) => {
// //   console.error('MongoDB connection error:', err);
// // });

// // MongoDB Connection

// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log('MongoDB connected'))
//   .catch((err) => console.error('MongoDB connection error:', err));

// // Example Route
// app.get('/', (req, res) => {
//   res.send('Hello, World!');
// });

// // Example route for user registration
// app.post('/api/auth/register', async (req, res) => {
//   const { name, email, password } = req.body;

//   // Add your user registration logic here (e.g., saving to database, hashing password, etc.)

//   res.status(200).json({
//     message: 'Registration successful',
//     data: { name, email }
//   });
// });

// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });





// const express = require('express');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
// const User = require('./models/User');

// // Configure environment variables
// dotenv.config();

// // Initialize the app
// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // MongoDB Connection
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log('MongoDB connected'))
//   .catch((err) => console.error('MongoDB connection error:', err));

// // Test Route
// app.get('/', (req, res) => {
//   res.send('Hello, World!');
// });

// // User Registration Route
// app.post('/api/auth/register', async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     if (!name || !email || !password) {
//       return res.status(400).json({ message: 'Please enter all fields' });
//     }

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const newUser = new User({
//       name,
//       email,
//       password: hashedPassword,
//     });

//     await newUser.save();

//     res.status(201).json({ message: 'User registered successfully', user: { name, email } });

//   } catch (error) {
//     console.error('Error during registration:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // User Login Route
// app.post('/api/auth/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({ message: 'Please enter all fields' });
//     }

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     res.status(200).json({
//       message: 'Login successful',
//       user: { name: user.name, email: user.email },
//     });

//   } catch (error) {
//     console.error('Error during login:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });


// const express = require('express');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
// const User = require('./models/User');

// // Configure environment variables
// dotenv.config();

// // Initialize the app
// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // MongoDB Connection
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log('MongoDB connected'))
//   .catch((err) => console.error('MongoDB connection error:', err));

// // Test Route
// app.get('/', (req, res) => {
//   res.send('Hello, World!');
// });

// // User Registration Route
// app.post('/api/auth/register', async (req, res) => {
//   try {
//     const { name, email, phone, location, password, bloodGroup, role } = req.body;

//     if (!name || !email || !phone || !location || !password || !bloodGroup || !role) {
//       return res.status(400).json({ message: 'Please enter all fields' });
//     }

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const newUser = new User({
//       name,
//       email,
//       phone,
//       location,
//       password: hashedPassword,
//       bloodGroup,
//       role
//     });

//     await newUser.save();

//     res.status(201).json({ message: 'User registered successfully', user: { name, email } });
//   } catch (error) {
//     console.error('Error during registration:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // User Login Route
// app.post('/api/auth/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({ message: 'Please enter all fields' });
//     }

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     res.status(200).json({
//       message: 'Login successful',
//       user: { name: user.name, email: user.email },
//     });

//   } catch (error) {
//     console.error('Error during login:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });





const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Registration
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, phone, location, password, bloodGroup, role } = req.body;

    if (!name || !email || !phone || !location || !password || !bloodGroup || !role) {
      return res.status(400).json({ message: 'Please enter all fields' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      phone,
      location,
      password: hashedPassword,
      bloodGroup,
      role
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: 'Please enter all fields' });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // JWT Token (optional)
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret123', {
      expiresIn: '7d',
    });

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        location: user.location,
        bloodGroup: user.bloodGroup,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
