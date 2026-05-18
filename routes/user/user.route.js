import express from "express";
import Users from "../../models/users.model.js";
import profileRouter from './customerProfile.route.js'
import sellerRouter from "./seller.route.js";
import customerRouter from "./customer.route.js";
import { registerUser } from "../../components/hashingPassword.js";
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

router.post("/user/signup", async (req, res) => {
    try {
        const usersData = req.body;

        const getUserByEmail = await Users.findOne({ email: usersData.email });
        if (getUserByEmail)
            return res.status(400).json({
                error: 'Bad Request',
                message: 'Email already exists. Please provide a diffirent one'
            });

        const hashedPassword = await registerUser(usersData.password);

        const newUser = await Users.create({ ...usersData, password: hashedPassword });
        res.json({
            success: true,
            message: 'new user added to database',
            newUser
        })

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.use('/user', profileRouter);
router.use('/user/seller', sellerRouter);
router.use('/user/customer', customerRouter);

export default router;
