import express from "express";
import {
  addQuestion,
  addReply,
  addReplyToReview,
  addReview,
  deleteCourse,
  editCourse,
  getAllCourses,
  getAllCoursesAdmin,
  getCourseContentByUser,
  getSingleCourse,
  uploadCourse,
} from "../controllers/courseController";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";

const courseRouter = express.Router();

courseRouter.post(
  "/create-course",
  isAuthenticated,
  authorizeRoles("admin"),
  uploadCourse
);
courseRouter.put(
  "/edit-course/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  editCourse
);
courseRouter.get("/get-single-course/:id", getSingleCourse);
courseRouter.get("/get-all-courses", getAllCourses);
courseRouter.get(
  "/get-course-by-user/:id",
  isAuthenticated,
  getCourseContentByUser
);
courseRouter.put("/add-question", isAuthenticated, addQuestion);
courseRouter.put("/add-reply", isAuthenticated, addReply);
courseRouter.put("/add-review/:id", isAuthenticated, addReview);
courseRouter.put(
  "/add-reply-to-review",
  isAuthenticated,
  authorizeRoles("admin"),
  addReplyToReview
);
courseRouter.get(
  "/get-all-courses-admin",
  isAuthenticated,
  authorizeRoles("admin"),
  getAllCoursesAdmin
);
courseRouter.delete(
  "/delete-course/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  deleteCourse
);

export default courseRouter;
