const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Validate MONGO_URI
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in environment variables!");
    }

    // MongoDB Connection
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000, // Improves connection stability
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error.message);
    process.exit(1); // Exit the process on failure
  }
};

module.exports = connectDB;
