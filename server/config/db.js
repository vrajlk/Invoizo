require('dotenv').config();
const mongoose = require('mongoose');

const URI = process.env.MONGO_URI;

const dbConnection = async () => {
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
    });
    console.log('Database connected');
  } catch (error) {
    console.log('Error connecting to database', error);
  }
}

module.exports = dbConnection;