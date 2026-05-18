import express from "express";
import Users from "../../models/users.model.js";
import { loginUser } from "../../components/loginValidate.js";
import jwt from "jsonwebtoken";
const customerRouter = express.Router({ mergeParams: true });

customerRouter.post('/login', async (req, res) => {
    try {

        const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
        const { username, email, password } = req.body;

        const user = await Users.findOne({ $or: [{ username }, { email }] });

        if (!user)
            return res.status(404).json({
                error: 'Not Found',
                message: "User not registered"
            });

        if (user.mode === 'seller')
            return res.status(401).json({
                error: 'cannot access user'
            })

        const validatePassword = await loginUser(password, user.password);

        if (!validatePassword.success)
            return res.status(401).json({ error: validatePassword.message });


        const token = jwt.sign(
            { userId: user._id, email: user.email },
            JWT_SECRET_KEY,
            { expiresIn: '1h' }
        )

        res.cookie('signIn_customer', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 3600000
        })

        res.status(200).json({
            success: true,
            message: "Logged in successfully!"
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

customerRouter.post('/logout', async (req, res) => {
    res.clearCookie('signIn_customer', {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
    })

    res.status(200).json({
        message: 'Logged out successfully!'
    })
})

export default customerRouter;