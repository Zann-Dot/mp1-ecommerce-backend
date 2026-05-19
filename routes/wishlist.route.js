import express from "express";
import Products from "../models/products.model.js";
const wishListRouter = express.Router();

wishListRouter.post('/wishlist/:productId', async (req, res) => {
    try {
        const product = await Products.findById(req.params.productId);

        if (!product)
            return res.status(404).json({
                error: 'Product not found'
            });

        const updateProductToWishlist = await Products.findByIdAndUpdate(
            req.params.productId,
            { isWishlist: true },
            { returnDocument: 'after' }
        )

        res.status(201).json({
            success: true,
            message: 'Product added to wishlist',
            updateProductToWishlist
        });
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

wishListRouter.get('/wishlist', async (req, res) => {
    try {
        const productsInUsersWishlist = await Products.find({ isWishlist: true });

        if (!productsInUsersWishlist || productsInUsersWishlist.length === 0)
            return res.status(404).json({ error: 'Wishlist is empty' });

        res.json(productsInUsersWishlist);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})
export default wishListRouter