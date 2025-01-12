import { Router } from "express";

import { handleSignIn } from "@quiz-app/controllers/sign-in";

const signInRouter = Router();

signInRouter.post("/", handleSignIn);

export { signInRouter };
