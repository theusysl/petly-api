// src/controllers/reportController.ts

import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

interface JwtPayload {
  id: number;
}

// Criar uma nova denúncia (anônima ou logada)
export const createReport = async (req: Request, res: Response) => {
  const { description, photoUrl, videoUrl, latitude, longitude } = req.body;
  let reporterId: number | null = null;

  // 1. Validação básica
  if (!description) {
    return res
      .status(400)
      .json({ message: "A descrição da denúncia é obrigatória." });
  }

  try {
    // 2. Lógica de Autenticação Opcional
    // Verifica se o cabeçalho de autorização existe
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];
      try {
        // Tenta verificar o token. Se for válido, pega o ID do usuário.
        const decoded = jwt.verify(
          token,
          process.env.JWT_SECRET as string
        ) as JwtPayload;
        reporterId = decoded.id;
      } catch (error) {
        // Se o token for inválido ou expirado, apenas ignoramos. A denúncia continua como anônima.
        console.log(
          "Token inválido recebido, a denúncia será registrada como anônima."
        );
      }
    }

    // 3. Cria a denúncia no banco de dados
    const newReport = await prisma.report.create({
      data: {
        description,
        photoUrl,
        videoUrl,
        latitude,
        longitude,
        reporterId, // Será o ID do usuário ou null se for anônima
      },
    });

    res.status(201).json(newReport);
  } catch (error) {
    console.error("Erro ao criar denúncia:", error);
    res.status(500).json({ message: "Erro interno ao criar denúncia." });
  }
};

// Obter todas as denúncias (apenas para admins)
export const getAllReports = async (req: Request, res: Response) => {
  try { const reports = await prisma.report.findMany({ orderBy: { createdAt: "desc" } }); res.json(reports); } catch (error) { res.status(500).json({ message: "Erro ao buscar denúncias.", error }); }
};

// Obter uma denúncia por ID (apenas para admins)
export const getReportById = async (req: Request, res: Response) => {
  try { const report = await prisma.report.findUnique({ where: { id: Number(req.params.id) } }); if (!report) return res.status(404).json({ message: "Denúncia não encontrada." }); res.json(report); } catch (error) { res.status(500).json({ message: "Erro ao buscar denúncia.", error }); }
};

// Atualizar o status de uma denúncia (apenas para admins)
export const updateReportStatus = async (req: Request, res: Response) => {
  const { status } = req.body;
  if (!["OPEN", "IN_PROGRESS", "RESOLVED"].includes(status)) return res.status(400).json({ message: "Status inválido." });
  try { const report = await prisma.report.update({ where: { id: Number(req.params.id) }, data: { status } }); res.json(report); } catch (error) { res.status(500).json({ message: "Erro ao atualizar denúncia.", error }); }
};
