const mongoose = require("mongoose");

const Comment = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  article: { type: mongoose.Schema.Types.ObjectId, ref: "Article" },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, required: true },

  // Counts
  likeCount: { type: Number, default: 0 },

  commentImgAddress: { type: String },
});

module.exports = Comment;
