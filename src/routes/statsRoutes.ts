import { Router } from "express";
import { getGeneralStats } from "../controllers/statsController.js";
import { protect, authorize } from "../middlewares/authMiddleware.js";

const router = Router();

router.get(
  "/", 
  protect, 
  authorize("ADMIN", "ONG"), // Restrito
  getGeneralStats
);

export default router;