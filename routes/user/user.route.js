import express from "express";
import Users from "../../models/users.model.js";
import profileRouter from './customerProfile.route.js'
import sellerRouter from "./seller.route.js";
import customerRouter from "./customer.route.js";
const router = express.Router();

router.get("/user", async (req, res) => {
    try {
        const users = await Users.find();

        if (users.length === 0)
            return res.status(404).json({ error: "Users not found" });

        res.json(users);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});


router.use('/user', profileRouter);
router.use('/user', sellerRouter);
router.use('/user', customerRouter);

export default router;
