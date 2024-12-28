import mongoose from "mongoose";

export const initializeDatabase = async () => {
  try {
    const mongoUrl: string = process.env.MONGODB as string;
    const connection = await mongoose.connect(mongoUrl);
    if (connection) {
      console.log("Connected to mongodb");
    }
  } catch (error) {
    console.log("Failed to connect to database");
  }
};
