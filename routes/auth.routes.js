import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs';
import User from "../models/user.model.js";

export const authRouter = express.Router();

authRouter.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),
  (req, res) => {
    const token = jwt.sign(
      {
        id: req.user._id,
        email: req.user.email,
        isAdmin: req.user.isAdmin,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );

    const frontendURL = process.env.FRONTEND_URL;
    res.redirect(`${frontendURL}/auth/success?token=${token}`);
  }
);

authRouter.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user) return res.status(401).json({ message: 'Invalid username' });

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(401).json({ message: 'Invalid password' });

  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
      isAdmin: user.isAdmin
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  res.json({ token, user });
});

authRouter.get("/me", passport.authenticate("jwt", { session: false }), (req, res) => {
  res.json({
    success: true,
    user: {
      id: req.user._id,
      email: req.user.email,
      name: req.user.name,
      username: req.user.username,
      isAdmin: req.user.isAdmin,
      avatar: req.user.avatar,
      points: req.user.points,
      quizesPlayed: req.user.quizesPlayed,
    },
  });
});

authRouter.post("/logout", (req, res) => {
  res.json({
    success: true,
    message: "Logged out successfully",
  });
});
