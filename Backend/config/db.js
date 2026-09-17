const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI?.trim();

    if (!uri) {
      throw new Error('MONGODB_URI is missing');
    }

    if (
      !uri.startsWith('mongodb://') &&
      !uri.startsWith('mongodb+srv://')
    ) {
      throw new Error(
        'Invalid MONGODB_URI format. It must start with mongodb:// or mongodb+srv://'
      );
    }

    await mongoose.connect(uri);

    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    throw error;
  }
};

module.exports = connectDB;
