import express from "express";
import Products from "../models/products.model.js";
const router = express.Router();

router.get("/category", async (req, res) => {
  try {
    const { category } = req.query;
    const products = await Products.find({ category });

    if (products.length === 0)
      return res.status(404).json({ error: `Product of ${category} not found` });

    res.json(products);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default router;
