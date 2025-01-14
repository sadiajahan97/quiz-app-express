import { Schema, Types, model } from "mongoose";

import { QuestionDifficulties, QuestionTypes } from "@quiz-app/enums/question";

const questionSchema = new Schema(
  {
    answer: { required: true, type: Schema.Types.Mixed },
    category: { required: true, type: String },
    difficulty: {
      enum: [
        QuestionDifficulties.EASY,
        QuestionDifficulties.HARD,
        QuestionDifficulties.MEDIUM,
      ],
      required: true,
      type: String,
    },
    options: { type: [String] },
    question: { required: true, type: String },
    type: {
      enum: [
        QuestionTypes.FILL_IN_THE_BLANKS,
        QuestionTypes.MCQ,
        QuestionTypes.SHORT_ANSWER,
        QuestionTypes.TRUE_FALSE,
      ],
      required: true,
      type: String,
    },
    userId: { required: true, type: Types.ObjectId },
  },
  { timestamps: true }
);

export const Question = model("Question", questionSchema);
