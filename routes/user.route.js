import express from "express";
import Users from "../models/users.model.js";
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



router.post("/user", async (req, res) => {
  try {
    const userInfo = req.body;

    if (!userInfo)
      return res
        .status(400)
        .json({ error: "One or more properties are missing" });

    const user = await Users.create(userInfo);
    await user.save();

    res.status(201).json({ message: "user added to database" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
