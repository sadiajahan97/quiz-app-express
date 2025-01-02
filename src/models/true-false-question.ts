import mongoose from "mongoose";

const trueFalseQuestionSchema = new mongoose.Schema({
  answer: {
    enum: ["True", "False"],
    type: String,
  },
  category: String,
  id: String,
  question: String,
  userId: String,
});

export const TrueFalseQuestionModel = mongoose.model(
  "true-false-questions-collection",
  trueFalseQuestionSchema
);
