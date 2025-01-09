import { Application, Router } from "express";

import { handleSignOut } from "@quiz-app/controllers/sign-out";

const signOutRouter = Router();

signOutRouter.post("", handleSignOut as Application);

export { signOutRouter };
