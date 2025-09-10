//src/controllers/petController.ts

import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Criar Pet
export const createPet = async (req: Request, res: Response) => {
  const { name, species, breed, age, status, userId } = req.body;

  try {
    const pet = await prisma.pet.create({
      data: { name, species, breed, age, status, userId },
    });

    res.status(201).json(pet);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar pet", error });
  }
};

// Listar todos os pets
export const getPets = async (_req: Request, res: Response) => {
  try {
    const pets = await prisma.pet.findMany({
      include: { owner: true }, // inclui dados do dono
    });
    res.json(pets);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar pets", error });
  }
};

// Buscar pet por ID
export const getPetById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const pet = await prisma.pet.findUnique({
      where: { id: Number(id) },
      include: { owner: true },
    });

    if (!pet) return res.status(404).json({ message: "Pet não encontrado" });
    res.json(pet);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar pet", error });
  }
};

// Atualizar pet
export const updatePet = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, species, breed, age, status } = req.body;

  try {
    const pet = await prisma.pet.update({
      where: { id: Number(id) },
      data: { name, species, breed, age, status },
    });

    res.json(pet);
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar pet", error });
  }
};

// Deletar pet
export const deletePet = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.pet.delete({ where: { id: Number(id) } });
    res.json({ message: "Pet deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar pet", error });
  }
};