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

/* ---------------- MIDDLEWARES ---------------- */
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON requests

/* ---------------- ROUTES ---------------- */
app.use("/api/auth", authRoutes); // Login / Register
app.use("/api/topics", topicRoutes); // DSA Topics
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
