import express from "express";
import Users from "../../models/users.model.js";
import { loginUser } from "../../components/loginValidate.js";
import jwt from "jsonwebtoken";
const router = express.Router();

router.post('/user/customer/login', async (req, res) => {
    try {

        const JWT_SECRET = process.env.JWT_SECRET;
        const { username, email, password } = req.body;

        const user = await Users.findOne({ $or: [{ username }, { email }] });

        if (user.mode === 'seller')
            return res.status(401).json({
                error: 'cannot access user'
            })

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



export default router;