import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  googleId: { type: String, unique: true, sparse: true },
  avatar: { type: String },
  isAdmin: { type: Boolean, default: false },
  quizesPlayed: { type: Number, default: 0 },
  points: { type: Number, default: 0 }
});

export default mongoose.model("User", userSchema);
