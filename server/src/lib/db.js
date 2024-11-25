import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`connected to MongoDB: ${db.connection.host}`);
  } catch (error) {
    console.log(`MongoDb Connection Error : ${error}`);
  }
};
