import mongoose from "mongoose";

const multipleChoiceQuestionSchema = new mongoose.Schema({
  answer: String,
  category: String,
  id: String,
  options: [String],
  question: String,
  userId: String,
});

export const MultipleChoiceQuestionModel = mongoose.model(
  "multiple-choice-questions-collection",
  multipleChoiceQuestionSchema
);
