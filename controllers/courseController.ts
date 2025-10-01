import { NextFunction, Request, Response } from "express";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import cloudinary from "../utils/cloudinary";
import { createCourse } from "../services/course.service";
import courseModel from "../models/courseModel";

export const uploadCourse = catchAsyncErrors(async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = req.body;
    if (data.thumbnail) {
      const cloud = await cloudinary.uploader.upload(data.thumbnail, {
        folder: "courses",
      });
      data.thumbnail = {
        public_id: cloud.public_id,
        url: cloud.secure_url,
      };
    }
    createCourse(data, res, next);
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 400));
  }
});

export const editCourse = catchAsyncErrors(async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = req.body;
    const courseId = req.params.id;
    const thumbnail = data.thumbnail;

    if (thumbnail) {
      await cloudinary.uploader.destroy(thumbnail.public_id);
      const cloud = await cloudinary.uploader.upload(thumbnail, {
        folder: "courses",
      });
      data.thumbnail = {
        public_id: cloud.public_id,
        url: cloud.secure_url,
      };
    }
    const course = await courseModel.findByIdAndUpdate(
      courseId,
      {
        $set: data,
      },
      { new: true }
    );
    res.status(201).json({ success: true, course });
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 400));
  }
});

export const getSingleCourse = catchAsyncErrors(async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const course = await courseModel
      .findById(req.params.id)
      .select(
        "-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links"
      );
    res.status(200).json({ success: true, course });
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 400));
  }
});

export const getAllCourses = catchAsyncErrors(async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const allCourses = await courseModel
      .find()
      .select(
        "-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links"
      );
    res.status(200).json({ success: true, allCourses });
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 400));
  }
});
