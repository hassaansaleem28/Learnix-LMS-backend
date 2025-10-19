import express from "express";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import { createOrder, getAllOrders } from "../controllers/orderController";
import { updateAccessToken } from "../controllers/userController";

const orderRouter = express.Router();

orderRouter.post(
  "/create-order",
  updateAccessToken,
  isAuthenticated,
  createOrder
);
orderRouter.get(
  "/get-all-orders",
  updateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  getAllOrders
);

export default orderRouter;
