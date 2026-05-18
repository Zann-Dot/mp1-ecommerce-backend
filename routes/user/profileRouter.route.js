import express from "express";
import Users from "../../models/users.model.js";
import authenticateToken from "../../components/authenticateToken.js";
const profileRouter = express.Router();

profileRouter.get('/profile/customer', authenticateToken, async (req, res) => {
    try {
        const userDetails = await Users.findById(req.user.userId);

        if (!userDetails)
            return res.status(404).json({ error: 'user not found' });

        res.json(userDetails)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
});

profileRouter.get('/profile/customer', authenticateToken, async (req, res) => {
    try {
        const userDetails = await Users.findById(req.user.userId);

        if (!userDetails)
            return res.status(404).json({ error: 'user not found' });

        res.json(userDetails)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
});


export default profileRouter;