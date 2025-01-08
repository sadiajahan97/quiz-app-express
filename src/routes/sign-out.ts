import { Application, Router } from "express";

import { handleSignOut } from "@quiz-app/controllers/sign-out";

const signOutRouter = Router();

signOutRouter.post("/:id", handleSignOut as Application);

export { signOutRouter };
