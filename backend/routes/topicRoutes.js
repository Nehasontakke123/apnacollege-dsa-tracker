/**
 * Routes for managing DSA Topics
 */

import express from "express";
import { getTopics, createTopic } from "../controllers/topicController.js";

const router = express.Router();

// Get all topics
router.get("/", getTopics);

// Create a new topic (Admin / Seed Data)
router.post("/", createTopic);

export default router;
