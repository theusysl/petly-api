import { Router } from "express";
import {
  createContent,
  getAllContent,
  deleteContent
} from "../controllers/educationalController.js";
import { protect, authorize } from "../middlewares/authMiddleware.js";
import { validate } from "../middlewares/validationMiddleware.js";
import { 
  createContentSchema, 
  contentIdSchema 
} from "../validations/educationalValidations.js";

const router = Router();

// Rota Pública: Qualquer um pode LER (Visitantes, Tutores, etc)
router.get("/", getAllContent);

// Rotas Protegidas: Apenas ADMIN, ONG ou VET podem CRIAR
router.post(
  "/", 
  protect, 
  authorize("ADMIN", "ONG", "VET"), // <--- AQUI ESTÁ A PROTEÇÃO
  validate(createContentSchema), 
  createContent
);

// Apenas ADMIN, ONG ou VET podem DELETAR
router.delete(
  "/:id", 
  protect, 
  authorize("ADMIN", "ONG", "VET"), // <--- AQUI TAMBÉM
  validate(contentIdSchema), 
  deleteContent
);

export default router;