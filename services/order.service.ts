import { NextFunction } from "express";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import orderModel from "../models/orderModel";

export const newOrder = catchAsyncErrors(async function (
  data: any,
  next: NextFunction
) {
  try {
    const newOrder = await orderModel.create(data);
    next(newOrder);
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 400));
  }
});
