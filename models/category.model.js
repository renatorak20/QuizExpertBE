import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    _id: { type: mongoose.Types.ObjectId },
  title: { type: String, required: true }
});

export default mongoose.model("Category", categorySchema);
