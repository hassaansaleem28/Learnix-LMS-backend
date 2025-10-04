import { NextFunction, Response } from "express";
import { redis } from "../utils/redis";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import userModel from "../models/userModel";

export const getUserById = async function (id: string, res: Response) {
  try {
    const userJson = await redis.get(id);
    if (userJson) {
      const user = JSON.parse(userJson);
      res.status(200).json({ success: true, user });
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getAllUsersService = catchAsyncErrors(async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const allUsers = await userModel.find().sort({ createdAt: -1 });
  res.status(200).json({ success: true, allUsers });
});
