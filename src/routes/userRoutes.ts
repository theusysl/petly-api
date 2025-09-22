// src/routes/userRoutes.ts

import { Router } from "express";
import {
  registerUser,
  loginUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import { protect, authorize } from "../middlewares/authMiddleware.js";
import { validate } from "../middlewares/validationMiddleware.js"; // Importar
import { registerUserSchema, loginUserSchema } from "../validations/userValidations.js"; // Importar

const router = Router();

// Registro e login públicos com validação
router.post("/register", validate(registerUserSchema), registerUser);
router.post("/login", validate(loginUserSchema), loginUser);

// CRUD protegido
router.get("/", protect, authorize("ADMIN"), getUsers);
router.get("/:id", protect, getUserById);
router.put("/:id", protect, updateUser);
router.delete("/:id", protect, authorize("ADMIN"), deleteUser);

export default router;