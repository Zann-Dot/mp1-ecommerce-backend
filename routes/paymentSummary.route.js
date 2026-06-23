import express from "express";
import Cart from "../models/cart.model.js";
import Products from "../models/products.model.js";
import Orders from "../models/orders.model.js";
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
                const discountedPrice = Math.round(
                    product.priceRupees - (product.priceRupees * product.discount) / 100,
                );
                subTotal += discountedPrice * item.quantity;
            }
        }

        taxCharge = Math.round((subTotal * 5) / 100);
        netTotal = subTotal + shippingCharge + taxCharge;

        res.json({
            subTotal,
            shippingCharge,
            taxCharge,
            netTotal,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/paymentSummary/order/:orderNumber", async (req, res) => {
    try {
        const { orderNumber } = req.params;
        const order = await Orders.findOne({ orderNumber }).populate({
            path: "orderSummary.cartItems.product",
            model: "Products",
        });

        if (!order) return res.status(404).json({ error: "Order not found" });

        const totalOrderAmount = order.orderSummary.cartItems.reduce(
            (prev, curr) => prev + curr.quantity * curr.product.priceRupees,
            0,
        );
        res.json({ totalOrderAmount });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
