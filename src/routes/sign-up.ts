import { Application, Router } from "express";

import { handleSignUp } from "@quiz-app/controllers/sign-up";

const signUpRouter = Router();

signUpRouter.post("/", handleSignUp as Application);

export { signUpRouter };
