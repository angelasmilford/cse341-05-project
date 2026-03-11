// db/connect.js
const mongoose = require('mongoose');
require('dotenv').config();

const initDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Mongoose connected successfully');
  } catch (err) {
    console.error('Mongoose connection error:', err);
    throw err;
  }
};

module.exports = initDb;