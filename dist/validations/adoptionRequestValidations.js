import { z } from "zod";
// Status possíveis (Baseado no Enum RequestStatus do Prisma)
const ADOPTION_STATUS = ["PENDING", "APPROVED", "REJECTED"];
export const createAdoptionSchema = z.object({
    body: z.object({
        // O petId é obrigatório e deve ser numérico
        petId: z.number().int().min(1),
    }),
});
export const updateAdoptionStatusSchema = z.object({
    params: z.object({
        id: z.string().regex(/^\d+$/, "ID inválido"),
    }),
    body: z.object({
        // Status deve ser estritamente um dos permitidos
        status: z.enum(ADOPTION_STATUS),
    }),
});
export const adoptionIdSchema = z.object({
    params: z.object({
        id: z.string().regex(/^\d+$/, "ID inválido"),
    }),
});
