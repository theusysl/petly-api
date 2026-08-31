import { Router } from "express";
import { upsertPartnerProfile, getPartnerProfile } from "../controllers/partnerController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { validate } from "../middlewares/validationMiddleware.js";
import { updatePartnerProfileSchema } from "../validations/partnerValidations.js";
const router = Router();
// Público: Ver o perfil de uma ONG/Vet específico
router.get("/:userId", getPartnerProfile);
// Protegido: Criar ou Editar o MEU perfil
router.put("/", protect, validate(updatePartnerProfileSchema), upsertPartnerProfile);
export default router;
