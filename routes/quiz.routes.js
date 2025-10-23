import express from "express";
import Quiz from "../models/quiz.model.js";
import { authenticateJWT, isAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", authenticateJWT, async (req, res) => {
  const quizzes = await Quiz.find();
  res.json(quizzes);
});

router.get("/:id", authenticateJWT, async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    res.json(quiz);
  } catch (error) {
    res.status(400).json({ message: "Invalid ID format" });
  }
});

router.post("/", authenticateJWT, isAdmin, async (req, res) => {
  const newQuiz = new Quiz(req.body);
  await newQuiz.save();
  res.status(201).json(newQuiz);
});

router.patch("/:id", authenticateJWT, isAdmin, async (req, res) => {
  const updatedQuiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedQuiz);
});

router.delete("/:id", authenticateJWT, isAdmin, async (req, res) => {
  await Quiz.findByIdAndDelete(req.params.id);
  res.json({ message: "Quiz deleted" });
});

export default router;
