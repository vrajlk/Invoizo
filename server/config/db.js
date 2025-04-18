require('dotenv').config();
const mongoose = require('mongoose');

const URI = process.env.MONGO_URI;

const dbConnection = async () => {
  try {
    await mongoose.connect(URI);
    console.log('Database connected');
    console.log("Using database:", mongoose.connection.name);

  } catch (error) {
    console.log('Error connecting to database', error);
  }
}

module.exports = dbConnection;