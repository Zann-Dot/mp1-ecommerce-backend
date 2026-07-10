import express from "express";
import Users from "../models/users.model.js";
import Cart from "../models/cart.model.js";

const router = express.Router();

router.get('/cart', async (req, res) => {
    try {
        const cartItems = await Cart.find({}).populate('product');

        if (!cartItems || cartItems.length === 0)
            return res.status(404).json({
                error: 'Not Found',
                message: 'Cart is Empty'
            });

        res.json(cartItems);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

router.post('/cart', async (req, res) => {
    try {
        const { userId, product, quantity, size } = req.body;
        let cartItem = await Cart.findOne({ product });
        const user = await Users.findById(userId);

        const updates = {};
        if (quantity !== null) updates.quantity = Number(quantity);
        if (size !== null) updates.size = size;

        if (!user)
            return res.status(404).json({ message: 'User not found' });

        if (cartItem) {
            cartItem = await Cart.findOneAndUpdate(
                { product },
                { $set: updates },
                { returnDocument: "after" }
            );

            if (!cartItem)
                return res.status(404).json({
                    error: 'Not Found',
                    message: `Cannot find cart item for product ${product}`
                });
        } else {
            if (typeof quantity !== "number" || quantity < 1)
                return res.status(400).json({
                    error: 'Bad Request',
                    message: 'Type quantity must be a number and greater than equals to 1'
                });

            cartItem = await Cart.create({ userId, product, quantity, size });
        }

        res.status(201).json({
            success: true,
            message: 'Added item to cart successfully',
            updatedCartItem: cartItem
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

router.put('/cart', async (req, res) => {
    try {
        const { userId, product, size, quantity } = req.body;
        let cartItem = await Cart.findOne({ product });
        const user = await Users.findById(userId);

        if (!user)
            return res.status(404).json({ message: 'User not found' });

        const incQuantity = quantity ? Number(quantity) : 1;

        if (cartItem) {
            cartItem = await Cart.findOneAndUpdate(
                { product },
                { $inc: { quantity: incQuantity } },
                { returnDocument: "after" }
            );
        } else {
            cartItem = await Cart.create({ userId, product, quantity: incQuantity, size });
        }

        res.status(200).json({
            success: true,
            message: 'Cart item updated successfully',
            updatedCartItem: cartItem
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
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
        res.status(500).json({ message: error.message });
    }
});
export default router;