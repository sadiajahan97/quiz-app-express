import { Request, Response } from "express";
import { isValidObjectId } from "mongoose";
import { z } from "zod";

import { User } from "@quiz-app/models/user";
import { Authentication } from "@quiz-app/types/authentication";
import { compareData, hashData } from "@quiz-app/utils/bcrypt";
import {
  editDisplayPictureSchema,
  editEmailSchema,
  editNameSchema,
  editPasswordSchema,
} from "@quiz-app/validators/edit-account";

export async function handleEditDisplayPicture(
  request: Request<
    unknown,
    unknown,
    Authentication & z.infer<typeof editDisplayPictureSchema>
  >,
  response: Response
): Promise<void> {
  try {
    const { id } = request.body.user;

    if (!isValidObjectId(id)) {
      response.status(400).json({
        data: null,
        message: "Invalid user ID format",
        status: 400,
      });

      return;
    }

    const { displayPicture, password } = editDisplayPictureSchema.parse(
      request.body
    );

    const user = await User.findById(id);

    if (!user || !user.hashedPassword) {
      response.status(404).json({
        data: null,
        message: "User not found",
        status: 404,
      });

      return;
    }

    const isMatch = await compareData(password, user.hashedPassword);

    if (!isMatch) {
      response.status(403).json({
        data: null,
        message: "Incorrect password",
        status: 403,
      });

      return;
    }

    user.displayPicture = displayPicture || ""; // Assign a default display picture

    const updatedUser = await user.save();

    response.status(200).json({
      data: {
        displayPicture: updatedUser.displayPicture,
      },
      message: "Display picture updated successfully",
      status: 200,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const validationErrors: Record<string, string> = {};

      for (const err of error.errors) {
        const path = err.path.join(".");

        validationErrors[path] = err.message;
      }

      response.status(400).json({
        data: null,
        message: validationErrors,
        status: 400,
      });

      return;
    }

    response.status(500).json({
      data: null,
      message: "Internal server error",
      status: 500,
    });
  }
}

export async function handleEditEmail(
  request: Request<
    unknown,
    unknown,
    Authentication & z.infer<typeof editEmailSchema>
  >,
  response: Response
): Promise<void> {
  try {
    const { id } = request.body.user;

    if (!isValidObjectId(id)) {
      response.status(400).json({
        data: null,
        message: "Invalid user ID format",
        status: 400,
      });

      return;
    }

    const { email, password } = editEmailSchema.parse(request.body);

    const user = await User.findById(id);

    if (!user || !user.hashedPassword) {
      response.status(404).json({
        data: null,
        message: "User not found",
        status: 404,
      });

      return;
    }

    const isMatch = await compareData(password, user.hashedPassword);

    if (!isMatch) {
      response.status(403).json({
        data: null,
        message: "Incorrect password",
        status: 403,
      });

      return;
    }

    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        response.status(409).json({
          data: null,
          message: "Email already exists",
          status: 409,
        });

        return;
      }
    }

    user.email = email;

    const updatedUser = await user.save();

    response.status(200).json({
      data: {
        email: updatedUser.email,
      },
      message: "Email updated successfully",
      status: 200,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const validationErrors: Record<string, string> = {};

      for (const err of error.errors) {
        const path = err.path.join(".");

        validationErrors[path] = err.message;
      }

      response.status(400).json({
        data: null,
        message: validationErrors,
        status: 400,
      });

      return;
    }

    response.status(500).json({
      data: null,
      message: "Internal server error",
      status: 500,
    });
  }
}

export async function handleEditName(
  request: Request<
    unknown,
    unknown,
    Authentication & z.infer<typeof editNameSchema>
  >,
  response: Response
): Promise<void> {
  try {
    const { id } = request.body.user;

    if (!isValidObjectId(id)) {
      response.status(400).json({
        data: null,
        message: "Invalid user ID format",
        status: 400,
      });

      return;
    }

    const { name, password } = editNameSchema.parse(request.body);

    const user = await User.findById(id);

    if (!user || !user.hashedPassword) {
      response.status(404).json({
        data: null,
        message: "User not found",
        status: 404,
      });

      return;
    }

    const isMatch = await compareData(password, user.hashedPassword);

    if (!isMatch) {
      response.status(403).json({
        data: null,
        message: "Incorrect password",
        status: 403,
      });

      return;
    }

    user.name = name;

    const updatedUser = await user.save();

    response.status(200).json({
      data: {
        name: updatedUser.name,
      },
      message: "Name updated successfully",
      status: 200,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const validationErrors: Record<string, string> = {};

      for (const err of error.errors) {
        const path = err.path.join(".");

        validationErrors[path] = err.message;
      }

      response.status(400).json({
        data: null,
        message: validationErrors,
        status: 400,
      });

      return;
    }

    response.status(500).json({
      data: null,
      message: "Internal server error",
      status: 500,
    });
  }
}

export async function handleEditPassword(
  request: Request<
    unknown,
    unknown,
    Authentication & z.infer<typeof editPasswordSchema>
  >,
  response: Response
): Promise<void> {
  try {
    const { id } = request.body.user;

    if (!isValidObjectId(id)) {
      response.status(400).json({
        data: null,
        message: "Invalid user ID format",
        status: 400,
      });

      return;
    }

    const { newPassword, oldPassword } = editPasswordSchema.parse(request.body);

    const user = await User.findById(id);

    if (!user || !user.hashedPassword) {
      response.status(404).json({
        data: null,
        message: "User not found",
        status: 404,
      });

      return;
    }

    const isMatch = await compareData(oldPassword, user.hashedPassword);

    if (!isMatch) {
      response.status(403).json({
        data: null,
        message: "Incorrect password",
        status: 403,
      });

      return;
    }

    user.hashedPassword = await hashData(newPassword);

    await user.save();

    response.status(200).json({
      data: null,
      message: "Password updated successfully",
      status: 200,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const validationErrors: Record<string, string> = {};

      for (const err of error.errors) {
        const path = err.path.join(".");

        validationErrors[path] = err.message;
      }

      response.status(400).json({
        data: null,
        message: validationErrors,
        status: 400,
      });

      return;
    }

    response.status(500).json({
      data: null,
      message: "Internal server error",
      status: 500,
    });
  }
}
