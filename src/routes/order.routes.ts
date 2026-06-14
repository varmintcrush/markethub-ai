import { Router } from "express";

import { auth } from "../middleware/auth.middleware";

import {
  createOrder,
  getOrders
} from "../controllers/order.controller";

const router = Router();

router.post(
  "/",
  auth,
  createOrder
);

router.get(
  "/",
  auth,
  getOrders
);

export default router;