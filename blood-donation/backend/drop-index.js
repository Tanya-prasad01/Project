const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('MongoDB connected');
    
    try {
      // Drop the specific index
      await mongoose.connection.db.collection('users').dropIndex('username_1');
      console.log('Successfully dropped username_1 index');
    } catch (err) {
      console.error('Error dropping index:', err.message);
    }
    
    mongoose.disconnect();
    console.log('MongoDB disconnected');
  })
  .catch(err => {
    console.error('Connection error:', err);
  });