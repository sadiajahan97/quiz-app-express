import { Request, Response } from "express";
import { isValidObjectId } from "mongoose";
import { z } from "zod";

import { QuestionTypes } from "@quiz-app/enums/question";
import { Question } from "@quiz-app/models/question";
import { Authentication } from "@quiz-app/types/authentication";
import { multipleChoiceQuestionSchema } from "@quiz-app/validators/multiple-choice-question";
import { trueFalseQuestionSchema } from "@quiz-app/validators/true-false-question";

export async function handleDeleteQuestion(
  request: Request<{ id: string }, unknown, Authentication>,
  response: Response
): Promise<void> {
  try {
    const { id } = request.params;

    if (!isValidObjectId(id)) {
      response.status(400).json({
        data: null,
        message: "Invalid question ID format",
        status: 400,
      });

      return;
    }

    const deletedQuestion = await Question.findByIdAndDelete(id);

    if (!deletedQuestion) {
      response.status(404).json({
        message: "Question not found",
        status: 404,
      });

      return;
    }

    response.status(200).json({
      data: null,
      message: "Question deleted successfully",
      status: 200,
    });
  } catch (error) {
    console.error("Error deleting question:", error);

    response.status(500).json({
      data: null,
      message: "Internal server error",
      status: 500,
    });
  }
}

export async function handleGetAllQuestionsByUser(
  request: Request<unknown, unknown, Authentication>,
  response: Response
): Promise<void> {
  try {
    const { id } = request.body.user;

    if (!isValidObjectId(id)) {
      response.status(400).json({
        data: null,
        message: "Invalid user ID format",
        status: 400,
      });

      return;
    }

    const allQuestions = await Question.find({
      userId: id,
    });

    if (!allQuestions) {
      response.status(404).json({
        message: "User not found",
        status: 404,
      });

      return;
    }

    response.status(200).json({
      data: allQuestions,
      message: "All questions retrieved successfully",
      status: 200,
    });
  } catch (error) {
    console.error("Error retrieving questions:", error);

    response.status(500).json({
      data: null,
      message: "Internal server error",
      status: 500,
    });
  }
}

export async function handlePostMultipleChoiceQuestion(
  request: Request<
    unknown,
    unknown,
    Authentication & z.infer<typeof multipleChoiceQuestionSchema>
  >,
  response: Response
): Promise<void> {
  try {
    const { id } = request.body.user;

    if (!isValidObjectId(id)) {
      response.status(400).json({
        data: null,
        message: "Invalid user ID format",
        status: 400,
      });

      return;
    }

    const { answer, category, difficulty, options, question } =
      multipleChoiceQuestionSchema.parse(request.body);

    const newQuestion = new Question({
      answer,
      category,
      difficulty,
      options,
      question,
      type: QuestionTypes.MCQ,
      userId: id,
    });

    const savedQuestion = await newQuestion.save();

    response.status(201).json({
      data: {
        answer: savedQuestion.answer,
        category: savedQuestion.category,
        difficulty: savedQuestion.difficulty,
        options: savedQuestion.options,
        question: savedQuestion.question,
      },
      message: "Multiple choice question posted successfully",
      status: 201,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const validationErrors: Record<string, string> = {};

      for (const err of error.errors) {
        const path = err.path.join(".");

        validationErrors[path] = err.message;
      }

      response.status(400).json({
        data: null,
        message: validationErrors,
        status: 400,
      });

      return;
    }

    response.status(500).json({
      data: null,
      message: "Internal server error",
      status: 500,
    });
  }
}

export async function handlePostTrueFalseQuestion(
  request: Request<
    unknown,
    unknown,
    Authentication & z.infer<typeof trueFalseQuestionSchema>
  >,
  response: Response
): Promise<void> {
  try {
    const { id } = request.body.user;

    if (!isValidObjectId(id)) {
      response.status(400).json({
        data: null,
        message: "Invalid user ID format",
        status: 400,
      });

      return;
    }

    const { answer, category, difficulty, question } =
      trueFalseQuestionSchema.parse(request.body);

    const newQuestion = new Question({
      answer,
      category,
      difficulty,
      question,
      type: QuestionTypes.TRUE_FALSE,
      userId: id,
    });

    const savedQuestion = await newQuestion.save();

    response.status(201).json({
      data: {
        answer: savedQuestion.answer,
        category: savedQuestion.category,
        difficulty: savedQuestion.difficulty,
        options: savedQuestion.options,
        question: savedQuestion.question,
      },
      message: "True/False question posted successfully",
      status: 201,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const validationErrors: Record<string, string> = {};

      for (const err of error.errors) {
        const path = err.path.join(".");

        validationErrors[path] = err.message;
      }

      response.status(400).json({
        data: null,
        message: validationErrors,
        status: 400,
      });

      return;
    }

    response.status(500).json({
      data: null,
      message: "Internal server error",
      status: 500,
    });
  }
}
