import { Router } from "express";

import { handleDeleteQuestion } from "@quiz-app/controllers/question";

const questionRouter = Router();

questionRouter.delete("/delete/:id", handleDeleteQuestion);

export { questionRouter };
