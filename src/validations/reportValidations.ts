import { z } from "zod";

// Definindo os status manualmente
const REPORT_STATUS = ["NEW", "IN_PROGRESS", "FORWARDED", "RESOLVED"] as const;

export const createReportSchema = z.object({
  body: z.object({
    description: z
      .string()
      .min(10, "A descrição deve ter pelo menos 10 caracteres")
      .max(1000, "A descrição é muito longa"),

    photoUrl: z
      .string()
      .url("URL da foto inválida")
      .optional()
      .or(z.literal("")),

    videoUrl: z
      .string()
      .url("URL do vídeo inválida")
      .optional()
      .or(z.literal("")),

    latitude: z
      .number()
      .optional(),
      
    longitude: z
      .number()
      .optional(),
  }),
});

export const updateReportStatusSchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/, "ID inválido"),
  }),
  body: z.object({
    // SIMPLIFICADO: Sem o objeto de erro customizado, igual ao do Pet
    status: z.enum(REPORT_STATUS),
  }),
});

export const reportIdSchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/, "ID inválido"),
  }),
});