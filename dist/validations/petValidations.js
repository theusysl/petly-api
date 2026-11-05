// src/validations/petValidations.ts
import { z } from "zod";
const STATUS_VALUES = ["AVAILABLE", "ADOPTED", "LOST", "FOUND"];
export const createPetSchema = z.object({
    body: z.object({
        name: z.string().min(1, "O nome é obrigatório").min(2),
        species: z.string().min(1, "A espécie é obrigatória"),
        breed: z.string().optional(),
        age: z.number().min(0),
        description: z.string().optional(),
        status: z.enum(STATUS_VALUES),
        photoUrl: z.string().refine((value) => value === "" || value.startsWith("data:image/") || /^https?:\/\//.test(value), "Imagem inválida").optional(),
        latitude: z.number().optional(),
        longitude: z.number().optional(),
    }),
});
export const updatePetSchema = z.object({
    params: z.object({
        id: z.string().regex(/^\d+$/, "ID inválido"),
    }),
    body: z.object({
        name: z.string().min(2).optional(),
        species: z.string().optional(),
        breed: z.string().optional(),
        age: z.number().min(0).optional(),
        description: z.string().optional(),
        status: z.enum(STATUS_VALUES).optional(),
        photoUrl: z.string().url().optional().or(z.literal("")),
        latitude: z.number().optional(),
        longitude: z.number().optional(),
    }).partial(),
});
export const petIdSchema = z.object({
    params: z.object({
        id: z.string().regex(/^\d+$/, "ID inválido"),
    }),
});
