import { Request, Response } from "express";
import { isValidObjectId } from "mongoose";
import { z } from "zod";

import { User } from "@quiz-app/models/user";
import { compareData } from "@quiz-app/utils/bcrypt";
import { editDisplayPictureSchema } from "@quiz-app/validators/edit-user";

export async function handleEditDisplayPicture(
  request: Request<
    { id: string },
    unknown,
    z.infer<typeof editDisplayPictureSchema>
  >,
  response: Response
): Promise<Response> {
  try {
    const { id } = request.params;

    if (!isValidObjectId(id)) {
      return response.status(400).json({
        data: null,
        message: "Invalid user ID format",
        status: 400,
      });
    }

    const { displayPicture, password } = editDisplayPictureSchema.parse(
      request.body
    );

    const user = await User.findById(id);

    if (!user || !user.hashedPassword) {
      return response.status(404).json({
        data: null,
        message: "User not found",
        status: 404,
      });
    }

    const isMatch = await compareData(password, user.hashedPassword);

    if (!isMatch) {
      return response.status(403).json({
        data: null,
        message: "Incorrect password",
        status: 403,
      });
    }

    user.displayPicture = displayPicture || ""; // Assign a default display picture

    const updatedUser = await user.save();

    return response.status(200).json({
      data: {
        displayPicture: updatedUser.displayPicture,
      },
      message: "User display picture updated successfully",
      status: 200,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const validationErrors: Record<string, string> = {};

      for (const err of error.errors) {
        const path = err.path.join(".");

        validationErrors[path] = err.message;
      }

      return response.status(400).json({
        data: null,
        message: validationErrors,
        status: 400,
      });
    }

    return response.status(500).json({
      data: null,
      message: "Internal server error",
      status: 500,
    });
  }
}
