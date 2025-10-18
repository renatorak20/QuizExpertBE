import express from "express";
import Category from "../models/category.model.js";
const router = express.Router();

router.get("/", async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
});

router.post("/", async (req, res) => {
  const newCategory = new Category(req.body);
  await newCategory.save();
  res.status(201).json(newCategory);
});

router.patch("/:id", async (req, res) => {
  const updatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedCategory);
});

router.delete("/:id", async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);
  res.json({ message: "Category deleted" });
});

export default router;
