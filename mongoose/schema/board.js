const mongoose = require("mongoose");

const Board = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now, required: true },
});

module.exports = Board;
