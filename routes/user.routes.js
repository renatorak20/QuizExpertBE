import express from "express";
import User from "../models/user.model.js";
import { authenticateJWT, isAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", authenticateJWT, isAdmin, async (req, res) => {
  const users = await User.find();
  res.json(users);
});

router.get("/:id", authenticateJWT, isAdmin, async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
});

router.post("/", authenticateJWT, isAdmin, async (req, res) => {
  const newUser = new User(req.body);
  await newUser.save();
  res.status(201).json(newUser);
});

router.patch("/:id", authenticateJWT, isAdmin, async (req, res) => {
  if (req.params.id !== req.user._id.toString() && !req.user.isAdmin) {
    return res.status(403).json({ message: "You can only update your own profile" });
  }
  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedUser);
});

router.delete("/:id", authenticateJWT, isAdmin, async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted successfully" });
});

export default router;
