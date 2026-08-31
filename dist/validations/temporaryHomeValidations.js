import { z } from "zod";
export const createTemporaryHomeSchema = z.object({
    body: z.object({
        // CORREÇÃO: Removemos o objeto de configuração { required_error: ... }
        capacity: z
            .number()
            .int()
            .min(1, "A capacidade deve ser de pelo menos 1 animal"),
        observations: z
            .string()
            .max(500, "As observações não podem ter mais de 500 caracteres")
            .optional(),
    }),
});
export const updateTemporaryHomeSchema = z.object({
    body: z.object({
        capacity: z.number().int().min(0).optional(),
        observations: z.string().max(500).optional(),
        isActive: z.boolean().optional(),
    }),
});
