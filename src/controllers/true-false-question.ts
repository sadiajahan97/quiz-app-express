import { Request, Response } from "express";

import { TrueFalseQuestionModel } from "@quiz-app/models/true-false-question";

export async function postTrueFalseQuestion(
  request: Request,
  response: Response
) {
  try {
    const { answer, category, id, question, userId } = request.body;
    const trueFalseQuestion = new TrueFalseQuestionModel({
      answer,
      category,
      id,
      question,
      userId,
    });
    await trueFalseQuestion.save();

    response.status(201).json({
      data: trueFalseQuestion,
      message: "True / False question posted successfully",
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
}
