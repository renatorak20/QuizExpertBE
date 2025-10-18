import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
    _id: { type: mongoose.Types.ObjectId },
  title: { type: String, required: true },
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }]
});

export default mongoose.model("Quiz", quizSchema);
