import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  questions: [{ type: String }]
});

export default mongoose.model("Quiz", quizSchema);
