const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('../config/db');
const Document = require('../models/Document');
const User = require('../models/User');
const Notice = require('../models/Notice');

const documentsData = require('./documents');
const usersData = require('./users');
const noticesData = require('./notices');

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();

    await Document.deleteMany({});
    await User.deleteMany({});
    await Notice.deleteMany({});

    const insertedDocs = await Document.insertMany(documentsData);
    const insertedUsers = await User.insertMany(usersData);
    const insertedNotices = await Notice.insertMany(noticesData);

    console.log(`Documents inserted: ${insertedDocs.length}`);
    console.log(`Users inserted: ${insertedUsers.length}`);
    console.log(`Notices inserted: ${insertedNotices.length}`);
    console.log('Seed completed successfully');

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Seed process failed:', error.message);
    process.exit(1);
  }
};

seedData();
