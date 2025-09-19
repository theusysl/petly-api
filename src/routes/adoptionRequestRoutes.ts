// src/routes/adoptionRequestRoutes.ts

import { Router } from "express";
import {
  createAdoptionRequest,
  getAllAdoptionRequests,
  updateAdoptionRequestStatus,
  deleteAdoptionRequest,
} from "../controllers/adoptionRequestController.js";

const router = Router();

router.post("/", createAdoptionRequest);
router.get("/", getAllAdoptionRequests);
router.patch("/:id", updateAdoptionRequestStatus);
router.delete("/:id", deleteAdoptionRequest);

export default router;