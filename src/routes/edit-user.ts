import { Application, Router } from "express";

import { handleEditDisplayPicture } from "@quiz-app/controllers/edit-user";

const editUserRouter = Router();

editUserRouter.post("/picture", handleEditDisplayPicture as Application);

export { editUserRouter };
