import express from "express";
import Users from "../models/users.model.js";
import { registerUser } from "../components/hashingPassword.js";
import { loginUser } from "../components/loginValidate.js";
import jwt from "jsonwebtoken";
import profileRouter from './user/customerProfile.route.js'
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

router.post('/user/login', async (req, res) => {
    try {
        const JWT_SECRET = process.env.JWT_SECRET;
        const { username, email, password } = req.body;

        const user = await Users.findOne({ $or: [{ username }, { email }] });

        if (!user)
            return res.status(404).json({
                error: 'Not Found',
                message: "User not registered"
            });

        const validatePassword = await loginUser(password, user.password);

        if (!validatePassword.success)
            return res.status(401).json({ error: validatePassword.message });


        const token = jwt.sign(
            { userId: user._id, email: user.email },
            JWT_SECRET,
            { expiresIn: '1h' }
        )

        res.cookie('signIn_user', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 3600000
        })

        res.status(200).json({ message: "Logged in successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

router.post("/user/signup", async (req, res) => {
    try {
        const usersData = req.body;

        const getUserByEmail = await Users.findOne({ email: usersData.email });
        if (getUserByEmail)
            return res.status(400).json({
                error: 'Bad Request',
                message: 'Email already exists. Please provide a diffrent one'
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

export default router;
