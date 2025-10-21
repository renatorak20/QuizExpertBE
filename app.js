// server.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import userRoutes from "./routes/user.routes.js";
import questionRoutes from "./routes/question.routes.js";
import quizRoutes from "./routes/quiz.routes.js";
import categoryRoutes from "./routes/category.routes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://renatorak20_db_user:Renatorak123@cluster0.wfejlkz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api/users", userRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/quizzes", quizRoutes);
app.use("/api/categories", categoryRoutes);

app.get("/", (req, res) => res.send("Quiz API is running..."));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
