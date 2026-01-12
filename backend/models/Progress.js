/**
 * Tracks user progress on each topic
 */

import mongoose from "mongoose";

const progressSchema = new mongoose.Schema({
  userId: String,
  topicId: String,
  completed: Boolean,
});

export default mongoose.model("Progress", progressSchema);
