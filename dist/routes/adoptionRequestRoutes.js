import { Router } from "express";
import { createAdoptionRequest, getAllAdoptionRequests, updateAdoptionRequestStatus, deleteAdoptionRequest, } from "../controllers/adoptionRequestController.js";
import { protect, authorize } from "../middlewares/authMiddleware.js";
import { validate } from "../middlewares/validationMiddleware.js"; // Importar
import { createAdoptionSchema, updateAdoptionStatusSchema, adoptionIdSchema } from "../validations/adoptionRequestValidations.js"; // Importar schemas
const router = Router();
router.use(protect);
// Validar criação
router.post("/", validate(createAdoptionSchema), createAdoptionRequest);
// Validar atualização de status
router.patch("/:id", validate(updateAdoptionStatusSchema), updateAdoptionRequestStatus);
// Validar ID na deleção
router.delete("/:id", validate(adoptionIdSchema), deleteAdoptionRequest);
router.get("/", authorize("ADMIN", "ONG"), getAllAdoptionRequests);
export default router;
