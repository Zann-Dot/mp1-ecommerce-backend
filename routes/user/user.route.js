import express from "express";
import Users from "../../models/users.model.js";
import profileRouter from './profileRouter.route.js'
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
        const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
        const findUserByEmail = await Users.findOne({ email: usersData.email });
        const findUserByUsername = await Users.findOne({ username: usersData.username });

        if (findUserByEmail)
            return res.status(400).json({
                error: 'Bad Request',
                message: "Email already exists. Try a different one"
            });

        if (findUserByUsername)
            return res.status(400).json({
                error: 'Bad Request',
                message: 'This username is already in use'
            });

        if (!strongPasswordRegex.test(req.body.password)) {
            return res.status(400).json({ message: "Please provide a strong password" });
        }

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

router.post('user/logout', async (req, res) => {
    res.clearCookie('signIn_user', {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
    })

    res.status(200).json({
        message: 'Logged out successfully!'
    })
})

router.put("/user/:userId", async (req, res) => {
    try {
        const { address } = req.body
        const updatedUserAddress = await Users.findByIdAndUpdate(
            req.params.userId,
            { address },
            { new: true });


        if (!updatedUserAddress)
            return res.status(404).json({ error: 'user not found' });

        res.json({
            success: true,
            message: 'Users address updated',
            updatedUserAddress
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.use('/user', profileRouter);
router.use('/user/seller', sellerRouter);
router.use('/user/customer', customerRouter);

export default router;
