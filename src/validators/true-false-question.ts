import { z } from "zod";

import { QuestionDifficulties } from "@quiz-app/enums/question";

export const trueFalseQuestionSchema = z.object({
  answer: z.boolean(),
  category: z.string().trim().nonempty("Category is required"),
  difficulty: z.enum([
    QuestionDifficulties.EASY,
    QuestionDifficulties.HARD,
    QuestionDifficulties.MEDIUM,
  ]),
  question: z.string().trim().nonempty("Question is required"),
  userId: z
    .string()
    .nonempty("User ID is required")
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid user ID format"),
});
