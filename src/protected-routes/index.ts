import { Router } from "express";

import { handleExtendSession } from "@quiz-app/controllers/extend-session";
import { handleSignOut } from "@quiz-app/controllers/sign-out";
import { verifyAccessToken } from "@quiz-app/middleware/jsonwebtoken";

import { editAccountRouter } from "./edit-account-routes";
import { questionsRouter } from "./questions-routes";

const protectedRouter = Router();

protectedRouter.use(verifyAccessToken);

protectedRouter.use("/edit-account", editAccountRouter);

protectedRouter.post("/extend-session", handleExtendSession);

protectedRouter.use("/questions", questionsRouter);

protectedRouter.post("/sign-out", handleSignOut);

export { protectedRouter };
