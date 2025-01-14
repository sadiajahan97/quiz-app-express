import { Router } from "express";

import { handlePostMultipleChoiceQuestion } from "@quiz-app/controllers/question";

const postQuestionsRouter = Router();

postQuestionsRouter.post(
  "/multiple-choice-question",
  handlePostMultipleChoiceQuestion
);

export { postQuestionsRouter };
