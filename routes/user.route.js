import express from "express";
import Users from "../models/users.model";
const router = express.Router();

router.post("/user", async (req, res) => {
  try {
    const { user, firstName, lastName, email, phoneNumber, address } = req.body;
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
