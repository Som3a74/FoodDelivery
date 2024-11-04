import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://mahmoudhossam219200:Khodary12345@cluster0.a0qzr.mongodb.net/food-delivery");
    console.log("MongoDB connected!");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};