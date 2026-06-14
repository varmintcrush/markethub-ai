import { Router } from "express";
import { allowRoles } from "../middleware/role.middleware";

import {
  createCategory,
  getCategories,
  deleteCategory
} from "../controllers/category.controller";

import { auth } from "../middleware/auth.middleware";

const router = Router();

router.get("/", getCategories);

router.post(
  "/",
  auth,
  allowRoles("ADMIN"),
  createCategory
);

router.delete(
  "/:id",
  auth,
  allowRoles(
    "ADMIN"
  ),
  deleteCategory
);

export default router;