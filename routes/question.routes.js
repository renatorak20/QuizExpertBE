import express from "express";
import Question from "../models/question.model.js";
const router = express.Router();

router.get("/", async (req, res) => {
  const questions = await Question.find();
  res.json(questions);
});

router.get("/:id", async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }
    res.json(question);
  } catch (error) {
    res.status(400).json({ message: "Invalid ID format" });
  }
});


router.post("/", async (req, res) => {
  const newQuestion = new Question(req.body);
  await newQuestion.save();
  res.status(201).json(newQuestion);
});

router.patch("/:id", async (req, res) => {
  const updatedQuestion = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedQuestion);
});

router.delete("/:id", async (req, res) => {
  await Question.findByIdAndDelete(req.params.id);
  res.json({ message: "Question deleted" });
});

export default router;
