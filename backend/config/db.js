const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Debugging line: Verify if the URI is being loaded from .env
    console.log("Attempting to connect with URI:", process.env.MONGODB_URI ? "Atlas URI Detected" : "Localhost Fallback");

    const dbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/nexxora';
    
    const conn = await mongoose.connect(dbURI);
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);321
  } catch (error) {
    console.error(`Database connection error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;