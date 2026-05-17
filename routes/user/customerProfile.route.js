import express from "express";
import Users from "../../models/users.model.js";
import jwt from "jsonwebtoken";
const router = express.Router();

function authenticateToken(req, res, next) {
    const token = req.cookies.signIn_user;

    if (!token)
        return res.status(401).json({ message: "Access Denied. Please log in." });

    try {
        const JWT_SECRET = process.env.JWT_SECRET;
        const verifiedUser = jwt.verify(token, JWT_SECRET);
        req.user = verifiedUser;
        next();
    } catch (error) {
        return res.status(403).json({ message: "Invalid or expired token." });
    }

}

router.get('/profile', authenticateToken, async (req, res) => {
    try {
        const userDetails = await Users.findById(req.user.userId);

        if (!userDetails)
            return res.status(404).json({ error: 'user not found' });

        res.json(userDetails)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
});

export default router;