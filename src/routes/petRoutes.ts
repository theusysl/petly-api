// src/routes/petRoutes.ts

import { Router } from "express";
import {
  createPet,
  getPets,
  getPetById,
  updatePet,
  deletePet,
} from "../controllers/petController.js";
import { protect, authorize } from "../middlewares/authMiddleware.js"; // Importar

const router = Router();

// Rotas públicas (qualquer um pode ver os pets)
router.get("/", getPets);
router.get("/:id", getPetById);

// Rotas protegidas (apenas usuários logados podem criar/editar/deletar)
router.post("/", protect, createPet);
router.put("/:id", protect, updatePet); // Adicionaremos mais lógica de permissão aqui depois
router.delete("/:id", protect, deletePet); // E aqui também

export default router;