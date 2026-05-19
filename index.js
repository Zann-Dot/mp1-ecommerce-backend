import { connectToDatabase } from "./db/db.connect.js";
import express from "express";
import cors from "cors";
import { configDotenv } from "dotenv";
import productRouter from "./routes/product.route.js";
import userRouter from "./routes/user/user.route.js";
import categoryRouter from "./routes/category.route.js";
import cartRouter from "./routes/cart.route.js";
import wishListRouter from "./routes/wishlist.route.js";
import cookieParser from 'cookie-parser';
import ordersRouter from "./routes/order.route.js";

import Products from "./models/products.model.js";
import fs from "fs";
const productData = JSON.parse(fs.readFileSync("defaultData/productData.json"));

configDotenv();
connectToDatabase();
const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
const PORT = process.env.PORT || 3000;

const seedData = async () => {
    try {
        await Products.deleteMany({});
        await Products.insertMany(productData);
    } catch (error) {
        throw error.message;
    }
};

app.use('/api', cartRouter)
app.use("/api", productRouter);
app.use("/api", userRouter);
app.use("/api", categoryRouter);
app.use("/api", wishListRouter);
app.use("/api", ordersRouter);

app.listen(PORT, () => {
    console.log(`Server is sunning on ${PORT}`);
});
