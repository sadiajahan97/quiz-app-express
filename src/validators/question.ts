import { z } from "zod";

import { QuestionDifficulties } from "@quiz-app/enums/question";

export const postMultipleChoiceQuestionSchema = z
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
  })
  .refine((data) => data.options.includes(data.answer), {
    message: "Answer must be one of the options",
    path: ["answer"],
  });

export const postTrueFalseQuestionSchema = z.object({
  answer: z.boolean(),
  category: z.string().trim().nonempty("Category is required"),
  difficulty: z.enum([
    QuestionDifficulties.EASY,
    QuestionDifficulties.HARD,
    QuestionDifficulties.MEDIUM,
  ]),
  question: z.string().trim().nonempty("Question is required"),
});

export const updateTrueFalseQuestionSchema = z
  .object({
    answer: z.boolean().optional(),
    category: z.string().trim().nonempty("Category is required").optional(),
    difficulty: z
      .enum([
        QuestionDifficulties.EASY,
        QuestionDifficulties.HARD,
        QuestionDifficulties.MEDIUM,
      ])
      .optional(),
    question: z.string().trim().nonempty("Question is required").optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided for update",
  });
