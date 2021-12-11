const mongoose = require("mongoose");

const User = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  major: { type: String, required: true },
  grade: { type: Number, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, required: true },
  nickname: { type: String, required: true, unique: true },
  score: { type: Number, default: 0, required: true },
});

User.virtual("setPassword").set(function (setPassword) {
  this.password = setPassword;
});

User.method("authenticate", function (inputPassword) {
  return this.password === inputPassword;
});

module.exports = User;
