/**
 * Routes for tracking user progress
 */

import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  toggleProgress,
  getProgress,
} from "../controllers/progressController.js";

const router = express.Router();

// Get user progress
router.get("/", protect, getProgress);

// Mark / unmark a topic as completed
router.post("/", protect, toggleProgress);

export default router;
