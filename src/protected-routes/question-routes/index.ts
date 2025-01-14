import { Router } from "express";

import {
  handleDeleteQuestion,
  handleGetAllQuestions,
} from "@quiz-app/controllers/question";

const questionRouter = Router();

questionRouter.delete("/delete/:id", handleDeleteQuestion);

questionRouter.get("/get", handleGetAllQuestions);

export { questionRouter };
