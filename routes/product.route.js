import express from "express";
import Products from "../models/products.model.js";
const router = express.Router();

router.get("/products", async (req, res) => {
  try {
    const products = await Products.find();

    if (products.length === 0)
      return res.status(404).json({ error: "Products not found" });

    res.json(products);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.get("/products/:productId", async (req, res) => {
  try {
    const product = await Products.findById(req.params.productId);

    if (!product) return res.status(404).json({ error: "Product not found" });

    res.json(product);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.get("/products/category/:category", async (req, res) => {
  try {
    const productsByCategory = await Products.find({
      category: req.params.category,
    });

    if (productsByCategory.length === 0)
      return res.status(404).json({ error: "Products not found" });

    res.json(productsByCategory);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.get("/products/ratings/:ratings", async (req, res) => {
  try {
    const ratings = parseInt(req.params.ratings);
    if (ratings >= 10) {
      const products = await Products.find({
        ratings: { $gte: ratings, $lt: ratings + 10 },
      });
      return res.json(products);
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default router;
