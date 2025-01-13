import { Router } from "express";

import {
  handleEditDisplayPicture,
  handleEditEmail,
  handleEditName,
  handleEditPassword,
} from "@quiz-app/controllers/edit-account";

const editAccountRouter = Router();

editAccountRouter.patch("/display-picture", handleEditDisplayPicture);

editAccountRouter.patch("/email", handleEditEmail);

editAccountRouter.patch("/name", handleEditName);

editAccountRouter.patch("/password", handleEditPassword);

export { editAccountRouter };
