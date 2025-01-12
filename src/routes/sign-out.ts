import { Router } from "express";

import { handleSignOut } from "@quiz-app/controllers/sign-out";

const signOutRouter = Router();

signOutRouter.post("", handleSignOut);

export { signOutRouter };
