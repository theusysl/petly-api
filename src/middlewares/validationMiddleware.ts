// src/middlewares/validationMiddleware.ts

import { Request, Response, NextFunction } from "express";
import { ZodError, z } from "zod";

export const validate =
  (schema: z.Schema) => // <-- TROCA FEITA AQUI
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        // Extrai a primeira mensagem de erro mais legível
        const firstError = error.errors[0];
        const field = firstError.path.join(".");
        return res.status(400).json({
          message: firstError.message || "Erro de validação",
          field: field,
          errors: error.format(),
        });
      }
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  };