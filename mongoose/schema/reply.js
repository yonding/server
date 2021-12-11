const mongoose = require("mongoose");

const Reply = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  comment: { type: mongoose.Schema.Types.ObjectId, ref: "Comment" },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, required: true },

  // Counts
  likeCount: { type: Number, default: 0 },

  replyImgAddress: { type: String },
});

module.exports = Reply;
