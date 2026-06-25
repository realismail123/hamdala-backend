import express from "express";
import User from "../models/User";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { fullname, phone, password } = req.body;

    const existingUser = await User.findOne({ phone });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const user = new User({
      fullname,
      phone,
      password,
    });

    await user.save();

    res.status(201).json({
      success: true,
      message: "Registration successful",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

export default router;
