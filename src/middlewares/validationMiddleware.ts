// src/middlewares/validationMiddleware.ts

import { Request, Response, NextFunction } from "express";
import { ZodError, z } from "zod";

export const validate =
  (schema: z.Schema) =>
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
        const zodError = error as any;

        const firstIssue = zodError.errors[0];
        const message = firstIssue ? firstIssue.message : "Erro de validação";

        const formattedErrors = zodError.errors.map((issue: any) => ({
          field: issue.path.join("."),
          message: issue.message,
        }));

        return res.status(400).json({
          message: message,
          errors: formattedErrors,
        });
      }
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  };