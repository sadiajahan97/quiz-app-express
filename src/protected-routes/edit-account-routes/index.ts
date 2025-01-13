import { Router } from "express";

import {
  handleEditDisplayPicture,
  handleEditName,
} from "@quiz-app/controllers/edit-account";

const editAccountRouter = Router();

editAccountRouter.patch("/display-picture", handleEditDisplayPicture);

editAccountRouter.patch("/name", handleEditName);

export { editAccountRouter };
