import { z } from "zod";

import { QuestionDifficulties } from "@quiz-app/enums/question";

export const multipleChoiceQuestionSchema = z
  .object({
    answer: z.string().trim().nonempty("Answer is required"),
    category: z.string().trim().nonempty("Category is required"),
    difficulty: z.enum([
      QuestionDifficulties.EASY,
      QuestionDifficulties.HARD,
      QuestionDifficulties.MEDIUM,
    ]),
    options: z
      .array(z.string().trim().nonempty("Option must not be empty"))
      .min(2, "At least two options are required")
      .refine((options) => new Set(options).size === options.length, {
        message: "Options must be unique",
      }),
    question: z.string().trim().nonempty("Question is required"),
    userId: z
      .string()
      .nonempty("User ID is required")
      .regex(/^[0-9a-fA-F]{24}$/, "Invalid user ID format"),
  })
  .refine((data) => data.options.includes(data.answer), {
    message: "Answer must be one of the options",
    path: ["answer"],
  });
