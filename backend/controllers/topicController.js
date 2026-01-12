/**
 * Topic Controllers
 */

import Topic from "../models/Topic.js";

// Get all topics
export const getTopics = async (req, res) => {
  const topics = await Topic.find();
  res.json(topics);
};

// Create new topic
export const createTopic = async (req, res) => {
  const topic = await Topic.create(req.body);
  res.json(topic);
};
