import { Router } from "express";
import {
  registerTemporaryHome,
  listTemporaryHomes,
  updateMyTemporaryHome
} from "../controllers/temporaryHomeController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { validate } from "../middlewares/validationMiddleware.js";
import { 
  createTemporaryHomeSchema, 
  updateTemporaryHomeSchema 
} from "../validations/temporaryHomeValidations.js";

const router = Router();

// LISTAR: Público (ou protegido, dependendo da regra de negócio. Deixei público para facilitar a busca)
router.get("/", listTemporaryHomes);

// CRIAR: Precisa estar logado
router.post(
  "/", 
  protect, 
  validate(createTemporaryHomeSchema), 
  registerTemporaryHome
);

// ATUALIZAR: Precisa estar logado (atualiza o PRÓPRIO lar)
router.put(
  "/me", 
  protect, 
  validate(updateTemporaryHomeSchema), 
  updateMyTemporaryHome
);

export default router;