// src/validations/userValidations.ts

import { z } from "zod";

export const registerUserSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(1, "O nome é obrigatório")
      .min(3, "O nome precisa ter no mínimo 3 caracteres"),

    email: z
      .string()
      .min(1, "O email é obrigatório")
      .email("Formato de email inválido"),

    password: z
      .string()
      .min(1, "A senha é obrigatória")
      .min(6, "A senha precisa ter no mínimo 6 caracteres"),

    // O campo 'role' é INTENCIONALMENTE omitido aqui.
    // Não permitimos que o usuário defina seu próprio role no registro.
    // Ele será definido como USER por padrão no banco de dados.
  }),
});

export const loginUserSchema = z.object({
  body: z.object({
    email: z
        .string()
        .min(1, "O email é obrigatório")
        .email("Formato de email inválido"), // Corrigi a mensagem de erro aqui

    password: z
        .string()
        .min(1, "A senha é obrigatória"),
  }),
});