import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  correct_answer_index: { type: Number, required: true },
  answers: [{ type: String, required: true }]
});

export default mongoose.model("Question", questionSchema);
