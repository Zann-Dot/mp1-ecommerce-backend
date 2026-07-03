import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const monogoUri = process.env.MONGODB;

export async function connectToDatabase() {
  if (mongoose.connections[0].readyState) return;

  await mongoose
    .connect(monogoUri)
    .then(() => console.log("Connected to Database"))
    .catch((err) => console.error(err));
}
