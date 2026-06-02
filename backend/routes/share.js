import { Router } from "express";
import { createShare, viewShare } from "../controllers/shareController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = Router();
router.post("/:itineraryId", protect, createShare);
router.get("/:slug", viewShare);
export default router;
