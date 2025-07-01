// config/mongodb.js
import mongoose from 'mongoose';
import 'dotenv/config';   // ensures process.env.MONGODB_URI is loaded

const connectDB = async () => {
  try {
    console.log('🔍 Connecting to:', process.env.MONGODB_URI);
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(
      `✅ MongoDB connected successfully to ${conn.connection.host}/${conn.connection.name}`
    );
  } catch (error) {
    console.error("❌ Initial DB connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
