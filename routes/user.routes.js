import express from "express";
import User from "../models/user.model.js";
const router = express.Router();

router.get("/", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
});

router.post("/", async (req, res) => {
  const newUser = new User(req.body);
  await newUser.save();
  res.status(201).json(newUser);
});

router.patch("/:id", async (req, res) => {
  console.log("Updating user with ID:", req.body);
  const updatedUser = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
  res.json(updatedUser);
});

router.delete("/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted successfully" });
});

export default router;
