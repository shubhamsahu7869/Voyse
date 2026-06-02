import mongoose from "mongoose";

export async function connectDB() {
  if (!process.env.MONGODB_URI) {
    console.warn("MONGODB_URI is not set. API started without a database connection.");
    return;
  }
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("MongoDB connected");
}
