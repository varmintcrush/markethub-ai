import { Router } from "express";

import {
  semanticSearch
} from "../controllers/search.controller";

const router = Router();

router.post(
  "/",
  semanticSearch
);

export default router;