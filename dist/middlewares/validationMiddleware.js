// src/middlewares/validationMiddleware.ts
import { ZodError } from "zod";
export const validate = (schema) => (req, res, next) => {
    try {
        schema.parse({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        return next();
    }
    catch (error) {
        if (error instanceof ZodError) {
            const zodError = error;
            const firstIssue = zodError.errors[0];
            const message = firstIssue ? firstIssue.message : "Erro de validação";
            const formattedErrors = zodError.errors.map((issue) => ({
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
