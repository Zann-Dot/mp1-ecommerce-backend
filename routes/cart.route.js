import express from "express";
import Users from "../models/users.model.js";
import Cart from "../models/cart.model.js";
import Products from "../models/products.model.js";
const router = express.Router();

router.get('/cart', async (req, res) => {
    try {
        const cartItems = await Cart.find({}).populate('product');

        if (!cartItems || cartItems.length === 0)
            return res.status(404).json({
                error: 'Not Found',
                message: 'Cannot find cart items'
            });

        res.json(cartItems);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

router.post('/cart', async (req, res) => {
    try {
        const { userId = 'guest', product, quantity, size } = req.body;
        let cartItem = await Cart.findOne({ product });
        const user = await Users.findById(userId);
        if (!user)
            return res.status(404).json({ error: 'User not found' });

        if (typeof quantity !== "number" || quantity < 1)
            return res.status(400).json({
                error: 'Bad Request',
                message: 'Type quantity must be a number and greater than equals to 1'
            });


        if (cartItem) {
            cartItem.quantity += quantity;
            await cartItem.save();
        } else {
            cartItem = await Cart.create({ userId, product, quantity, size });
        }

        res.status(201).json({
            success: true,
            message: 'Added item to cart successfully',
            updatedCartItem: cartItem
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

router.put('/cart/:productId', async (req, res) => {
    try {
        const product = req.params.productId
        const { quantity } = req.body;

        const cartItem = await Cart.findOne({ product });

        if (!cartItem)
            return res.status(404).json({
                error: 'Not Found',
                message: `cannot find cart item of _id ${product}`
            });

        if (typeof quantity !== "number" || quantity < 1)
            return res.status(400).json({
                error: 'Bad Request',
                message: 'Type quantity must be a number and greater than equals to 1'
            });


        if (cartItem.quantity - quantity < 0)
            return res.status(400).json({
                error: 'Bad Request',
                message: 'cart item quantity cannot be less than zero'
            });

        const updatedCartItem = await Cart.findOneAndUpdate(
            { product },
            { quantity: cartItem.quantity - quantity },
            { returnDocument: 'after' }
        );

        res.json({
            success: true,
            message: 'Item updated successfully',
            updatedCartItem
        })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

router.delete("/cart/:productId", async (req, res) => {
    const product = req.params.productId;
    const deletedCartItem = await Cart.findOneAndDelete({ product });

    if (!deletedCartItem) {
        return res.status(404).json({
            error: "Not Found",
            message: "Item not found in the cart"
        });
    }

    res.status(201).json({
        success: true,
        message: "Deletion Successful",
        deletedCartItem
    });
});

router.delete("/cart", async (req, res) => {
    try {
        const result = await Cart.deleteMany({});
        res.json({
            success: true,
            message: "Cart destroyed",
            deletedCount: result.deletedCount,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
export default router;