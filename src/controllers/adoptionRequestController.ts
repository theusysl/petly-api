// src/controllers/adoptionRequestController.ts

import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Criar solicitação de adoção
export const createAdoptionRequest = async (req: Request, res: Response) => {
  const { petId } = req.body; // Pega apenas o petId do body
  const userId = (req as any).user.id; // Pega o userId do token

  try {
    // Verifica se o pet existe
    const pet = await prisma.pet.findUnique({ where: { id: petId } });
    if (!pet) return res.status(404).json({ message: "Pet não encontrado" });

    // Só pets disponíveis podem ser solicitados
    if (pet.status !== "AVAILABLE")
      return res.status(400).json({ message: "Pet não disponível para adoção" });

    // Verifica se o usuário já solicitou esse pet
    const existingRequest = await prisma.adoptionRequest.findFirst({
      where: { userId, petId },
    });
    if (existingRequest)
      return res.status(400).json({ message: "Você já solicitou este pet" });

    // Cria a solicitação
    const request = await prisma.adoptionRequest.create({
      data: { userId, petId },
    });

    res.status(201).json(request);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar solicitação", error });
  }
};

// Listar todas as solicitações
export const getAllAdoptionRequests = async (req: Request, res: Response) => {
  try {
    const requests = await prisma.adoptionRequest.findMany({
      include: { user: true, pet: true },
    });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: "Erro ao listar solicitações", error });
  }
};

// Atualizar status da solicitação (APROVADO/REJEITADO)
export const updateAdoptionRequestStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  const loggedInUser = (req as any).user; // Usuário que está fazendo a ação

  try {
    const request = await prisma.adoptionRequest.findUnique({
      where: { id: Number(id) },
      include: { pet: true },
    });
    if (!request) return res.status(404).json({ message: "Solicitação não encontrada" });

    // Apenas dono do pet ou admin podem aprovar/rejeitar
    if (loggedInUser.role !== "ADMIN" && loggedInUser.id !== request.pet.ownerId) {
         return res.status(403).json({ message: "Você não tem permissão para aprovar/rejeitar" });
    }

    // Atualiza status
    const updated = await prisma.adoptionRequest.update({
      where: { id: Number(id) },
      data: { status },
    });

    // Se aprovado, muda status do pet para ADOPTED
    if (status === "APPROVED") {
      await prisma.pet.update({
        where: { id: request.petId },
        data: { status: "ADOPTED" },
      });
    }

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar solicitação", error });
  }
};

// Deletar solicitação
export const deleteAdoptionRequest = async (req: Request, res: Response) => {
  const { id } = req.params;
  const loggedInUser = (req as any).user;

  try {
    // 1. Busca a solicitação no banco
    const requestToDelete = await prisma.adoptionRequest.findUnique({
      where: { id: Number(id) },
    });

    // 2. Verifica se a solicitação existe
    if (!requestToDelete) {
      return res.status(404).json({ message: "Solicitação não encontrada." });
    }

    // 3. LÓGICA DE AUTORIZAÇÃO:
    // Verifica se o usuário logado é o autor da solicitação OU um admin
    if (requestToDelete.userId !== loggedInUser.id && loggedInUser.role !== "ADMIN") {
      return res.status(403).json({ message: "Acesso negado. Você não tem permissão para deletar esta solicitação." });
    }

    // 4. Se a autorização passar, deleta a solicitação
    await prisma.adoptionRequest.delete({ where: { id: Number(id) } });

    res.json({ message: "Solicitação deletada com sucesso" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar solicitação", error });
  }
};
