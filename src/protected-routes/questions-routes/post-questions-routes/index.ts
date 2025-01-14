import { Router } from "express";

import {
  handlePostMultipleChoiceQuestion,
  handlePostTrueFalseQuestion,
} from "@quiz-app/controllers/question";

const postQuestionsRouter = Router();

postQuestionsRouter.post(
  "/multiple-choice-question",
  handlePostMultipleChoiceQuestion
);

postQuestionsRouter.post("/true-false-question", handlePostTrueFalseQuestion);

export { postQuestionsRouter };
