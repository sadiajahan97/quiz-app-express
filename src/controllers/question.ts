import { Request, Response } from "express";
import { isValidObjectId } from "mongoose";

import { Question } from "@quiz-app/models/question";
import { Authentication } from "@quiz-app/types/authentication";

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

export async function handleGetAllQuestions(
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
