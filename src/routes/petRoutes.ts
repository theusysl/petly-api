// src/routes/petRoutes.ts

import { Router } from "express";
import {
  createPet,
  getPets,
  getPetById,
  updatePet,
  deletePet,
} from "../controllers/petController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { validate } from "../middlewares/validationMiddleware.js"; // Seu middleware
import { 
  createPetSchema, 
  updatePetSchema, 
  petIdSchema 
} from "../validations/petValidations.js"; // Novos schemas

const router = Router();

// Rotas públicas
router.get("/", getPets);
// Validamos se o ID é número antes de chamar o controller
router.get("/:id", validate(petIdSchema), getPetById);

// Rotas protegidas
router.post(
  "/", 
  protect, 
  validate(createPetSchema), // Valida o body completo
  createPet
);

router.put(
  "/:id", 
  protect, 
  validate(updatePetSchema), // Valida params.id E body parcial
  updatePet
);

router.delete(
  "/:id", 
  protect, 
  validate(petIdSchema), // Valida apenas params.id
  deletePet
);

export default router;