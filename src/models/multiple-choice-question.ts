import { mcqSchema } from "@quiz-app/schemas/multiple-choice-question";
import mongoose from "mongoose";

export const MultipleChoiceQuestionModel = mongoose.model(
  "multiple-choice-questions-collection",
  mcqSchema
);
