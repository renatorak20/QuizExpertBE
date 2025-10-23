// server.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import passport from "passport";
import session from "express-session";

import userRoutes from "./routes/user.routes.js";
import questionRoutes from "./routes/question.routes.js";
import quizRoutes from "./routes/quiz.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import { authRouter } from './routes/auth.routes.js';
import { useGoogleStrategy } from "./passport.config.js";
import { useJWTStrategy } from "./middleware/auth.middleware.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

useGoogleStrategy();
useJWTStrategy();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));


app.use("/quizexpert/v1/auth", authRouter);
app.use("/api/users", userRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/quizzes", quizRoutes);
app.use("/api/categories", categoryRoutes);

app.get("/", (req, res) => res.send("Quiz API is running..."));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
