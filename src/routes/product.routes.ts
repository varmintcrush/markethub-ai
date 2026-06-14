
import { Router } from "express";

import { auth } from "../middleware/auth.middleware";
import { allowRoles } from "../middleware/role.middleware";
import { upload } from "../middleware/upload";



import {
  createProduct,
  getProducts,
  uploadProductImage,
  deleteProduct,
  updateProduct
} from "../controllers/product.controller";


const router = Router();

/* Public */

router.get(
  "/",
  getProducts
);

/* Seller + Admin */

router.post(
  "/",
  auth,
  allowRoles(
    "SELLER",
    "ADMIN"
  ),
  createProduct
);

router.post(
  "/upload",
  auth,
  allowRoles(
    "SELLER",
    "ADMIN"
  ),
  upload.single("image"),
  uploadProductImage
);

router.delete(
  "/:id",
  auth,
  allowRoles(
    "SELLER",
    "ADMIN"
  ),
  deleteProduct
);

router.put(
  "/:id",
  auth,
  allowRoles(
    "SELLER",
    "ADMIN"
  ),
  updateProduct
);

export default router;
