import mongoose from "mongoose";

export function mongoDbConnect() {
  const uri = process.env.MONGODB_URI; // Replace with your MongoDB URI

  mongoose.connect(uri);

  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));

  db.once("open", () => {
    console.log("Connected to MongoDB");
  });
}
