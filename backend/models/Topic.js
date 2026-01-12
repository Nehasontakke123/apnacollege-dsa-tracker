/**
 * DSA Topic Schema
 */

import mongoose from "mongoose";

const topicSchema = new mongoose.Schema({
  chapter: String,
  title: String,
  youtube: String,
  leetcode: String,
  article: String,
  level: String, // Easy / Medium / Hard
});

export default mongoose.model("Topic", topicSchema);
