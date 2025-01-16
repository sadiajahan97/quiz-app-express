import { Router } from "express";

import { handleSignOut } from "@quiz-app/controllers/sign-out";
import { handleVerifyAccessToken } from "@quiz-app/middleware/jsonwebtoken";

import { editAccountRouter } from "./edit-account-routes";
import { questionsRouter } from "./questions-routes";

const protectedRouter = Router();

protectedRouter.use(handleVerifyAccessToken);

protectedRouter.use("/edit-account", editAccountRouter);

protectedRouter.use("/questions", questionsRouter);

protectedRouter.post("/sign-out", handleSignOut);

export { protectedRouter };
