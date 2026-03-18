import mongoose  from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ Connection error:', (err as Error).message);
    process.exit(1); // stop the app if DB connection fails
  }
};

export default connectDB