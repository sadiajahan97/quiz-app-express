import { Router } from "express";

import { handleCreateNewAccessToken } from "@quiz-app/controllers/extend-session";
import { handleSignIn } from "@quiz-app/controllers/sign-in";
import { handleSignUp } from "@quiz-app/controllers/sign-up";

const router = Router();

router.get("/extend-session", handleCreateNewAccessToken);

router.post("/sign-in", handleSignIn);

router.post("/sign-up", handleSignUp);

export { router };
