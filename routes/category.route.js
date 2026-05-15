import express from "express";
import Products from "../models/products.model.js";
const router = express.Router();

router.get("/category", async (req, res) => {
  try {
    const category = await Products.distinct("category");

    if (category.length === 0)
      return res.status(404).json({ error: "category not found" });

    res.json(category);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default router;
