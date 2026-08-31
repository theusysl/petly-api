import { z } from "zod";
export const createEventSchema = z.object({
    body: z.object({
        title: z.string().min(5, "O título deve ter pelo menos 5 caracteres"),
        description: z.string().min(10, "A descrição deve ter pelo menos 10 caracteres"),
        // coerce.date() valida se a string enviada é uma data válida
        date: z.coerce.date(),
        location: z.string().min(3, "Localização muito curta"),
    }),
});
export const updateEventSchema = z.object({
    params: z.object({
        id: z.string().regex(/^\d+$/, "ID inválido"),
    }),
    body: z.object({
        title: z.string().min(5).optional(),
        description: z.string().min(10).optional(),
        date: z.coerce.date().optional(),
        location: z.string().min(3).optional(),
    }).partial(),
});
export const eventIdSchema = z.object({
    params: z.object({
        id: z.string().regex(/^\d+$/, "ID inválido"),
    }),
});
