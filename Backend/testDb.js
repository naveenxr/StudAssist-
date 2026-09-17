const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

const testConnection = async () => {
  try {
    await connectDB();
    console.log('MongoDB connection test successful');
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Test connection error:', error.message);
    process.exit(1);
  }
};

testConnection();
