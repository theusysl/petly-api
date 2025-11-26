import { z } from "zod";

// Tipos permitidos conforme comentário no seu schema.prisma
const CONTENT_TYPES = ["artigo", "video", "guia"] as const;

export const createContentSchema = z.object({
  body: z.object({
    title: z
      .string()
      .min(5, "O título deve ter pelo menos 5 caracteres"),
      
    type: z.enum(CONTENT_TYPES), // Valida se é um dos tipos permitidos

    url: z
      .string()
      .url("A URL fornecida é inválida"), // Valida formato http://...
  }),
});

export const contentIdSchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/, "ID inválido"),
  }),
});