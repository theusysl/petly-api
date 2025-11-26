import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Criar Conteúdo (Artigo/Vídeo)
export const createContent = async (req: Request, res: Response) => {
  const { title, type, url } = req.body;
  const user = (req as any).user;

  try {
    const content = await prisma.educationalContent.create({
      data: {
        title,
        type,
        url,
        authorId: user.id,
      },
    });

    res.status(201).json(content);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar conteúdo educativo." });
  }
};

// Listar todo o conteúdo
export const getAllContent = async (req: Request, res: Response) => {
  try {
    const contents = await prisma.educationalContent.findMany({
      orderBy: { createdAt: "desc" }, // Mais recentes primeiro
      include: {
        author: {
          select: { name: true, role: true } // Mostra quem postou
        }
      }
    });
    res.json(contents);
  } catch (error) {
    res.status(500).json({ message: "Erro ao listar conteúdos." });
  }
};

// Deletar conteúdo
export const deleteContent = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = (req as any).user;

  try {
    const content = await prisma.educationalContent.findUnique({
      where: { id: Number(id) },
    });

    if (!content) {
      return res.status(404).json({ message: "Conteúdo não encontrado." });
    }

    // Autorização: Apenas o dono ou Admin pode deletar
    if (content.authorId !== user.id && user.role !== "ADMIN") {
      return res.status(403).json({ message: "Sem permissão para deletar este conteúdo." });
    }

    await prisma.educationalContent.delete({
      where: { id: Number(id) },
    });

    res.json({ message: "Conteúdo removido com sucesso." });
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar conteúdo." });
  }
};