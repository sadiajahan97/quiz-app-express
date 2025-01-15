import { Router } from "express";

import { handleUpdateTrueFalseQuestion } from "@quiz-app/controllers/question";

const updateQuestionsRouter = Router();

// updateQuestionsRouter.patch(
//   "/multiple-choice-question/:id",
//   handleUpdateMultipleChoiceQuestion
// );

updateQuestionsRouter.patch(
  "/true-false-question/:id",
  handleUpdateTrueFalseQuestion
);

export { updateQuestionsRouter };
