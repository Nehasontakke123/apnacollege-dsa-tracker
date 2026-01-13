/**
 * ApnaCollege DSA Tracker Backend
 * Entry point for Express server
 * Handles authentication, topics and progress tracking
 */

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

// Route imports
import authRoutes from "./routes/authRoutes.js";
import topicRoutes from "./routes/topicRoutes.js";
import progressRoutes from "./routes/progressRoutes.js";

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

/* ---------------- CORS CONFIG ---------------- */
app.use(
  cors({
    origin: [
      "http://localhost:5173",                       // Local React
      "http://localhost:3000",
      "https://apnacollege-dsa-tracker-u7pu.vercel.app", // Vercel frontend
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

/* ---------------- MIDDLEWARES ---------------- */
app.use(express.json()); // Parse JSON requests

/* ---------------- ROUTES ---------------- */
app.use("/api/auth", authRoutes);       // Login / Register
app.use("/api/topics", topicRoutes);    // DSA Topics
app.use("/api/progress", progressRoutes); // User Progress

/* ---------------- HEALTH CHECK ---------------- */
app.get("/", (req, res) => {
  res.send("DSA Tracker API Running 🚀");
});

/* ---------------- SERVER ---------------- */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
