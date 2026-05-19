import express from "express"
import Orders from "../models/orders.model.js";
const ordersRouter = express.Router();

ordersRouter.post('/orders', async (req, res) => {
    try {
        const {
            productSummary,
            orderSummary
        } = req.body;

        if (productSummary.length === 0 || !Array.isArray(productSummary))
            return res.status(401).json({ error: 'product summary must be an array' });

        if (!orderSummary)
            return res.status(401).json({ error: 'order summary is empty' });

        await Orders.create({ productSummary, orderSummary });

        res.json({
            success: true,
            message: 'Order placed successfully'
        });

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

ordersRouter.get('/orders', async (req, res) => {
    try {
        const orders = await Orders.find().populate('productSummary');

        if (orders.length === 0)
            return res.status(404).json({ error: 'orders not found' });

        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})
export default ordersRouter;