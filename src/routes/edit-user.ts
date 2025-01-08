import { Application, Router } from "express";

import { handleEditUser } from "@quiz-app/controllers/edit-user";

const editUserRouter = Router();

editUserRouter.post("/:id", handleEditUser as Application);

export { editUserRouter };
