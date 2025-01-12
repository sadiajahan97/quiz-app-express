import { Router } from "express";

import {
  handleEditDisplayPicture,
  handleEditName,
} from "@quiz-app/controllers/edit-user";

const editUserRouter = Router();

editUserRouter.put("/picture", handleEditDisplayPicture);
editUserRouter.put("/name", handleEditName);

export { editUserRouter };
