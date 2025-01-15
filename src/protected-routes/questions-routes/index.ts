import { Router } from "express";

import {
  handleDeleteQuestion,
  handleGetAllQuestionsByUser,
} from "@quiz-app/controllers/question";

import { postQuestionsRouter } from "./post-questions-routes";
import { updateQuestionsRouter } from "./update-questions-routes";

const questionsRouter = Router();

questionsRouter.delete("/delete/:id", handleDeleteQuestion);

questionsRouter.get("/get", handleGetAllQuestionsByUser);

questionsRouter.use("/post", postQuestionsRouter);

questionsRouter.use("/update", updateQuestionsRouter);

export { questionsRouter };
