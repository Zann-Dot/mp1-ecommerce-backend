import { connectToDatabase } from "./db/db.connect.js";
import Products from "./models/products.model.js";
import express from "express";
import cors from "cors";
import { configDotenv } from "dotenv";
configDotenv();
connectToDatabase();
const app = express();
app.use(express.json());
app.use(cors);
const PORT = process.env.PORT || 3000;

const seedData = async () => {
  try {
    await Products.deleteMany({});
    await Products.insertMany(productData);
  } catch (error) {
    throw error.message;
  }
};

app.listen(PORT, () => {
  console.log(`Server is sunning on ${PORT}`);
});
