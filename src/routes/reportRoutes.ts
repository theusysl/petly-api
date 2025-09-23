// src/routes/reportRoutes.ts

import { Router } from "express";
import {
    createReport,
    getAllReports,
    getReportById,
    updateReportStatus,
} from "../controllers/reportController.js";
import { protect, authorize } from "../middlewares/authMiddleware.js";

const router = Router();

// Rota pública para qualquer pessoa (logada ou não) criar uma denúncia
router.post("/", createReport);

// A partir daqui, todas as rotas exigem autenticação de ADMIN
router.use(protect, authorize("ADMIN"));

router.get("/", getAllReports);
router.get("/:id", getReportById);
router.patch("/:id", updateReportStatus); // Usamos PATCH para atualizações parciais de status

export default router;