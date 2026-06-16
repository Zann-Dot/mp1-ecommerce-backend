import express from 'express';
import Cart from '../models/cart.model.js';
import Products from '../models/products.model.js';
const router = express.Router();

router.get("/paymentSummary", async (req, res) => {
    try {
        const { shipping } = req.query;
        let subTotal = 0;
        let shippingCharge = shipping !== "" ? Number(shipping) : 0;
        let taxCharge = 0;
        let netTotal = 0;
        const cartItems = await Cart.find({}).populate("product");

        if (cartItems.length !== 0) {
            for (const item of cartItems) {
                const product = await Products.findById(item.product._id);
                const discountedPrice = Math.round(product.priceRupees - (product.priceRupees * product.discount) / 100);
                subTotal += discountedPrice * item.quantity;
            }
        }

        taxCharge = Math.round((subTotal * 5) / 100);
        netTotal = subTotal + shippingCharge + taxCharge;

        res.json({
            subTotal,
            shippingCharge,
            taxCharge,
            netTotal
        })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

export default router;