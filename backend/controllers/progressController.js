/**
 * Progress Controllers
 */

import Progress from "../models/Progress.js";

// Toggle completed state
export const toggleProgress = async (req, res) => {
  const { topicId } = req.body;

  let progress = await Progress.findOne({ userId: req.user, topicId });

  if (progress) {
    progress.completed = !progress.completed;
    await progress.save();
  } else {
    progress = await Progress.create({
      userId: req.user,
      topicId,
      completed: true,
    });
  }

  res.json(progress);
};

// Get all progress of user
export const getProgress = async (req, res) => {
  const progress = await Progress.find({ userId: req.user });
  res.json(progress);
};
