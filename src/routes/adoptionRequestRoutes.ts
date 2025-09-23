// src/routes/adoptionRequestRoutes.ts

import { Router } from "express";
import {
  createAdoptionRequest,
  getAllAdoptionRequests,
  updateAdoptionRequestStatus,
  deleteAdoptionRequest,
} from "../controllers/adoptionRequestController.js";
import { protect, authorize } from "../middlewares/authMiddleware.js"; // Importar authorize

const router = Router();

// Todas as rotas de adoção precisam de autenticação
router.use(protect);

router.post("/", createAdoptionRequest);
router.patch("/:id", updateAdoptionRequestStatus);
router.delete("/:id", deleteAdoptionRequest);

// Apenas ADMIN e ONG podem ver todas as solicitações
router.get("/", authorize("ADMIN", "ONG"), getAllAdoptionRequests);

export default router;