import express from "express";
import Checkout from "../models/checkout.model.js";
const checkoutRouter = express.Router();

checkoutRouter.get("/checkout", async (req, res) => {
    try {
        const checkout = await Checkout.find();
        if (!checkout)
            return res.status(404).json({
                error: "Not found",
                message: "checkout data not found",
            });
        res.json(checkout);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

checkoutRouter.post("/checkout", async (req, res) => {
    try {
        await Checkout.deleteMany({});
        const { email, fullName, phoneNumber, address, shipping, deliveryTime } =
            req.body;

        if (
            !email ||
            !fullName ||
            !phoneNumber ||
            !address ||
            !deliveryTime
        )
            return res.status(401).json({
                error: "Bad request",
                message: `Any one of the fields is missing`,
            });

        const checkout = await Checkout.create({
            email,
            fullName,
            phoneNumber,
            address,
            shipping,
            deliveryTime,
        });
        res.json({
            success: true,
            message: "Form data added successfully",
            checkout,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default checkoutRouter;
