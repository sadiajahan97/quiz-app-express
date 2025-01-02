import { Request, Response } from "express";

import { MultipleChoiceQuestionModel } from "@quiz-app/models/multiple-choice-question";

export const postMultipleChoiceQuestion = async (
  request: Request,
  response: Response
) => {
  try {
    const { answer, category, id, options, question, userId } = request.body;
    const multipleChoiceQuestion = new MultipleChoiceQuestionModel({
      answer,
      category,
      id,
      options,
      question,
      userId,
    });
    await multipleChoiceQuestion.save();

    response.status(201).json({
      data: multipleChoiceQuestion,
      message: "Multiple choice question posted successfully",
      statusCode: 201,
      success: true,
    });
  } catch (error) {
    response.status(500).json({
      error,
      message: "Internal server error",
      statusCode: 500,
      success: false,
    });
  }
};
