// src/routes/eventRoutes.ts

import { Router } from "express";
import {
    createEvent,
    getAllEvents,
    getEventById,
    updateEvent,
    deleteEvent,
    approveEvent
} from "../controllers/eventController.js";
import { protect, authorize } from "../middlewares/authMiddleware.js";

const router = Router();

// Rota pública para listar eventos
router.get("/", getAllEvents);
router.get("/:id", getEventById);

// Rotas protegidas: apenas usuários logados (e futuramente com roles específicas) podem gerenciar eventos
router.post("/", protect, createEvent);
router.put("/:id", protect, updateEvent);
router.delete("/:id", protect, deleteEvent); // Ex: Apenas Admin ou ONG podem deletar
router.patch("/:id/approve", protect, authorize("ADMIN"), approveEvent);

export default router;