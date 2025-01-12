import { Router } from "express";

import { handleEditDisplayPicture } from "@quiz-app/controllers/edit-user";

const editUserRouter = Router();

editUserRouter.post("/picture", handleEditDisplayPicture);

export { editUserRouter };
