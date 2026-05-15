import { Router } from "express";
import {
  generateDesign,
  getCredits,
  getGenerationStatus,
  getMyGenerations,
} from "../controllers/ai.controller";
import { protect } from "../middleware/auth.middleware";

const router = Router();

router.use(protect);

router.post("/generate", generateDesign);
router.get("/status/:id", getGenerationStatus);
router.get("/my-generations", getMyGenerations);
router.get("/credits", getCredits);

export default router;
