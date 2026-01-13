/**
 * ApnaCollege DSA Tracker Backend
 * Entry point for Express server
 */

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import topicRoutes from "./routes/topicRoutes.js";
import progressRoutes from "./routes/progressRoutes.js";

dotenv.config();
connectDB();

const app = express();

/* ---------------- CORS ---------------- */
app.use(
  cors({
    origin: true,        // allow all origins (mobile + vercel + localhost)
    credentials: true,
  })
);

/* ---------------- MIDDLEWARES ---------------- */
app.use(express.json());

/* ---------------- ROUTES ---------------- */
app.use("/api/auth", authRoutes);
app.use("/api/topics", topicRoutes);
app.use("/api/progress", progressRoutes);

/* ---------------- HEALTH ---------------- */
app.get("/", (req, res) => {
  res.send("DSA Tracker API Running 🚀");
});

/* ---------------- SERVER ---------------- */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
