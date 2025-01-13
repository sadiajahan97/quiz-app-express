import { Router } from "express";

import {
  handleEditDisplayPicture,
  handleEditEmail,
  handleEditName,
} from "@quiz-app/controllers/edit-account";

const editAccountRouter = Router();

editAccountRouter.patch("/display-picture", handleEditDisplayPicture);

editAccountRouter.patch("/email", handleEditEmail);

editAccountRouter.patch("/name", handleEditName);

export { editAccountRouter };
