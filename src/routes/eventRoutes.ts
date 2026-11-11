import { Router } from "express";
import {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  approveEvent,
  getPendingEvents,
  moderateEvent
} from "../controllers/eventController.js";
import { protect, authorize } from "../middlewares/authMiddleware.js";
import { validate } from "../middlewares/validationMiddleware.js"; // Importar
import { 
  createEventSchema, 
  updateEventSchema, 
  eventIdSchema 
} from "../validations/eventValidations.js"; // Importar schemas

const router = Router();

router.get("/moderation/pending", protect, authorize("ADMIN"), getPendingEvents);

router.patch("/:id/moderation", protect, authorize("ADMIN"), validate(eventIdSchema), moderateEvent);

router.get("/", getAllEvents);

router.get(
  "/:id", 
  validate(eventIdSchema), 
  getEventById
);

// Rotas protegidas
router.post(
  "/", 
  protect, 
  validate(createEventSchema), 
  createEvent
);

router.put(
  "/:id", 
  protect, 
  validate(updateEventSchema), 
  updateEvent
);

router.delete(
  "/:id", 
  protect, 
  validate(eventIdSchema), 
  deleteEvent
);

// Approve não tem body, só params ID
router.patch(
  "/:id/approve", 
  protect, 
  authorize("ADMIN"), 
  validate(eventIdSchema), 
  approveEvent
);

export default router;
