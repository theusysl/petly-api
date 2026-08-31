//src/controllers/petController.ts
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
// Criar pet
export const createPet = async (req, res) => {
    // 1. Pega os dados do pet do body (sem ownerId)
    const { name, species, breed, age, description, status, photoUrl, latitude, longitude, } = req.body;
    // 2. Pega o ID do usuário logado (dono) a partir do token
    const ownerId = req.user.id;
    try {
        const pet = await prisma.pet.create({
            data: {
                name,
                species,
                breed,
                age,
                description,
                status: status,
                ownerId,
                photoUrl,
                latitude,
                longitude,
            },
        });
        res.status(201).json(pet);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao criar pet", error });
    }
};
// Listar todos os pets
export const getPets = async (req, res) => {
    try {
        const pets = await prisma.pet.findMany({
            include: {
                owner: {
                    select: { id: true, name: true, email: true, role: true },
                },
            },
        });
        res.json(pets);
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao listar pets", error });
    }
};
// Buscar pet por ID
export const getPetById = async (req, res) => {
    const { id } = req.params;
    try {
        const pet = await prisma.pet.findUnique({
            where: { id: Number(id) },
            include: {
                owner: {
                    select: { id: true, name: true, email: true, role: true },
                },
            },
        });
        if (!pet)
            return res.status(404).json({ message: "Pet não encontrado" });
        res.json(pet);
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao buscar pet", error });
    }
};
// Atualizar pet
export const updatePet = async (req, res) => {
    const { id } = req.params;
    const { name, species, breed, age, description, status, photoUrl, latitude, longitude } = req.body;
    const user = req.user; // Pegamos o usuário logado
    try {
        // 1. Buscamos o pet no banco
        const pet = await prisma.pet.findUnique({
            where: { id: Number(id) },
        });
        // 2. Verificamos se o pet existe
        if (!pet) {
            return res.status(404).json({ message: "Pet não encontrado" });
        }
        // 3. LÓGICA DE AUTORIZAÇÃO: Verificamos se o usuário é o dono ou um admin
        if (pet.ownerId !== user.id && user.role !== "ADMIN") {
            return res
                .status(403)
                .json({
                message: "Acesso negado. Você não tem permissão para editar este pet.",
            });
        }
        // 4. Se a autorização passar, atualizamos o pet
        const updatedPet = await prisma.pet.update({
            where: { id: Number(id) },
            data: {
                name,
                species,
                breed,
                age,
                description,
                status: status,
                photoUrl,
                latitude,
                longitude
            },
        });
        res.json(updatedPet);
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao atualizar pet", error });
    }
};
// Deletar pet
export const deletePet = async (req, res) => {
    const { id } = req.params;
    const user = req.user; // Pegamos o usuário logado
    try {
        // 1. Buscamos o pet no banco
        const pet = await prisma.pet.findUnique({
            where: { id: Number(id) },
        });
        // 2. Verificamos se o pet existe
        if (!pet) {
            return res.status(404).json({ message: "Pet não encontrado" });
        }
        // 3. LÓGICA DE AUTORIZAÇÃO: Verificamos se o usuário é o dono ou um admin
        if (pet.ownerId !== user.id && user.role !== "ADMIN") {
            return res
                .status(403)
                .json({
                message: "Acesso negado. Você não tem permissão para deletar este pet.",
            });
        }
        // 4. Se a autorização passar, deletamos o pet
        await prisma.pet.delete({
            where: { id: Number(id) },
        });
        res.json({ message: "Pet deletado com sucesso" });
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao deletar pet", error });
    }
};
