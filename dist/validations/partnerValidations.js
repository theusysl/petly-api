import { z } from "zod";
export const updatePartnerProfileSchema = z.object({
    body: z.object({
        cnpj: z.string().min(14, "CNPJ inválido").optional().or(z.literal("")),
        website: z.string().url().optional().or(z.literal("")),
        pixKey: z.string().min(5).optional(),
        description: z.string().max(1000).optional(),
        openingHours: z.string().max(100).optional(),
        services: z.string().max(500).optional(),
    }),
});
