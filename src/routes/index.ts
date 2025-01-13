import { Router } from "express";

import { handleSignIn } from "@quiz-app/controllers/sign-in";
import { handleSignUp } from "@quiz-app/controllers/sign-up";

const router = Router();

router.post("/sign-in", handleSignIn);

router.post("/sign-up", handleSignUp);

export { router };
