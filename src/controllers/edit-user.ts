import { Request, Response } from "express";
import { isValidObjectId } from "mongoose";
import { z } from "zod";

import { editUserZodSchema } from "@quiz-app/models/edit-user";
import { User } from "@quiz-app/models/user";
import { hashData } from "@quiz-app/utils/bcrypt";

export async function handleEditUser(
  request: Request<{ id: string }, unknown, z.infer<typeof editUserZodSchema>>,
  response: Response
): Promise<Response> {
  try {
    const { id } = request.params;

    if (!isValidObjectId(id)) {
      return response.status(400).json({
        message: "Invalid user ID format",
        statusCode: 400,
        success: false,
      });
    }

    const validatedData = editUserZodSchema.parse(request.body);

    if (Object.keys(validatedData).length === 0) {
      return response.status(400).json({
        message: "No valid fields provided for update",
        statusCode: 400,
        success: false,
      });
    }

    const user = await User.findById(id);

    if (!user) {
      return response.status(404).json({
        message: "User not found",
        statusCode: 404,
        success: false,
      });
    }

    const { email } = validatedData;

    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return response.status(409).json({
          message: "Email already in use",
          statusCode: 409,
          success: false,
        });
      }
    }

    for (const [field, value] of Object.entries(validatedData)) {
      if (field === "password" && value) {
        user.set("hashedPassword", await hashData(value));
      } else if (value) {
        user.set(field, value);
      }
    }

    const updatedUser = await user.save();

    return response.status(200).json({
      data: {
        displayPicture: updatedUser.displayPicture,
        email: updatedUser.email,
        name: updatedUser.name,
      },
      message: "User information updated successfully",
      statusCode: 200,
      success: true,
    });
  } catch (error) {
    console.error("Edit user error:", error);

    if (error instanceof z.ZodError) {
      return response.status(400).json({
        errors: error.errors,
        message: "Validation failed",
        statusCode: 400,
        success: false,
      });
    }

    return response.status(500).json({
      message: "Internal server error",
      statusCode: 500,
      success: false,
    });
  }
}
