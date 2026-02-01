const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }

    await mongoose.connect(process.env.MONGO_URI, {
      autoIndex: true
    });

    console.log("✅ MongoDB connected");

    // Connection event listeners (important for production)
    mongoose.connection.on("error", err => {
      console.error("❌ MongoDB runtime error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("⚠️ MongoDB disconnected");
    });

    mongoose.connection.on("reconnected", () => {
      console.log("🔄 MongoDB reconnected");
    });

    return mongoose.connection;

  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    throw error; // Let server.js decide what to do
  }
};

module.exports = connectDB;
