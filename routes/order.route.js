import express from "express";
import Orders from "../models/orders.model.js";
const ordersRouter = express.Router();

ordersRouter.post("/orders", async (req, res) => {
    try {
        const { productSummary, orderSummary, orderNumber } = req.body;

        if (productSummary.length === 0 || !Array.isArray(productSummary))
            return res
                .status(401)
                .json({ error: "product summary must be an array" });

        if (!orderSummary)
            return res.status(401).json({ error: "order summary is empty" });

        if (typeof orderNumber !== "number")
            return res.status(401).json({ error: "Order number must be a number" })

        const orders = await Orders.findOneAndUpdate(
            { orderNumber },
            { productSummary, orderSummary },
            { returnDocument: "after" },
        );

        if (!orders)
            await Orders.create({ productSummary, orderSummary, orderNumber });

        res.json({
            success: true,
            message: "Order placed successfully",
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

ordersRouter.get("/orders", async (req, res) => {
    try {
        const orders = await Orders.find().populate("productSummary");

        if (orders.length === 0)
            return res.status(404).json({ error: "orders not found" });

        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

ordersRouter.get("/orders/:orderNumber", async (req, res) => {
    try {
        const order = await Orders.findOne({ orderNumber: req.params.orderNumber });

        if (!order)
            return res
                .status(404)
                .json({ error: `Order of ${req.params.orderNumber} number not found` });

        res.json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default ordersRouter;
