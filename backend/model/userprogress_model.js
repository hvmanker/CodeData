// userProgress.model.js

const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  questionId: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["completed", "unanswered"],
    default: "unanswered",
  },
  tag:{
    type:String,
    required:true
  }
});

const userProgressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "users", // Assuming you have a User model, adjust accordingly
  },
  questions: [questionSchema],
});

const UserProgress = mongoose.model("UserProgress", userProgressSchema);

module.exports = UserProgress;
