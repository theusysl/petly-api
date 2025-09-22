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
        return res.status(400).json({
          message: "Erro de validação",
          errors: error.format(),
        });
      }
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  };