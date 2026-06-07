import express from "express";
import Products from "../models/products.model.js";
const router = express.Router();

router.get("/products", async (req, res) => {
    try {
        const categoryQuery = req.query.c;
        const minPrice = req.query.min;
        const maxPrice = req.query.max;
        const rating = req.query.r;
        let query = {};

        if (categoryQuery) {
            const categoryArray = Array.isArray(categoryQuery)
                ? categoryQuery
                : [categoryQuery];
            query.category = { $in: categoryArray };
        }

        if (minPrice && maxPrice)
            query.priceRupees =
                Number(maxPrice) === 2000
                    ? { $gte: Number(minPrice) }
                    : { $gte: Number(minPrice), $lte: Number(maxPrice) };

        if (rating)
            query.ratings =
                rating !== "all"
                    ? {
                        $gte: Number(rating) * 10,
                        $lt: Number(rating) * 10 + 10,
                    }
                    : { $gt: 0 };

        const products = await Products.find(query);

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

router.get("/products/search/:search", async (req, res) => {
    try {
        const { search } = req.params;

        const searchRegex = new RegExp(`\\b${search}\\b`, "i");
        const searchedProducts = await Products.find({
            $or: [{ productName: searchRegex }, { category: searchRegex }],
        });

        res.json(searchedProducts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
