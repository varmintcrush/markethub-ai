import { Router } from "express";
import { allowRoles } from "../middleware/role.middleware";

import {
  createStore,
  getStores
} from "../controllers/store.controller";

import { auth } from "../middleware/auth.middleware";

const router = Router();

router.get("/", getStores);

router.post(
  "/",
  auth,
  allowRoles("SELLER"),
  createStore
);

export default router;