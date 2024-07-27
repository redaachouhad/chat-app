import mongoose from "mongoose";

export async function connectMongodb() {
  try {
    await mongoose.connect(process.env.MONGODB_URL as string);
    console.log("MongoDb Connected");
  } catch (error) {
    console.log(error);
  }
}
