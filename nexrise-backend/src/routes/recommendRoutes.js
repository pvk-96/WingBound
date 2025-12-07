import { Router } from "express";
import { recommendController } from "../controllers/recommendController.js";
import { validateRecommendRequest } from "../middleware/validateRequest.js";

const router = Router();

router.post("/", validateRecommendRequest, recommendController);

export default router;

