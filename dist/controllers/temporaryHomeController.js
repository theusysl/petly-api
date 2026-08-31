import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
// Registrar-se como Lar Temporário
export const registerTemporaryHome = async (req, res) => {
    const { capacity, observations } = req.body;
    const userId = req.user.id; // Vem do token
    try {
        // 1. Verifica se o usuário já possui um cadastro de Lar Temporário
        const existingHome = await prisma.temporaryHome.findUnique({
            where: { userId },
        });
        if (existingHome) {
            return res.status(400).json({
                message: "Você já possui um perfil de Lar Temporário cadastrado."
            });
        }
        // 2. Cria o registro
        const newHome = await prisma.temporaryHome.create({
            data: {
                capacity,
                observations,
                userId,
            },
        });
        res.status(201).json(newHome);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao registrar lar temporário." });
    }
};
// Listar todos os Lares Temporários Disponíveis
export const listTemporaryHomes = async (req, res) => {
    try {
        const homes = await prisma.temporaryHome.findMany({
            where: { isActive: true }, // Apenas os ativos
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        phone: true, // Importante para contato
                        address: true, // Importante para logística
                        reputation: true
                    }
                }
            }
        });
        res.json(homes);
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao listar lares temporários." });
    }
};
// Atualizar meu perfil de Lar Temporário
export const updateMyTemporaryHome = async (req, res) => {
    const userId = req.user.id;
    const { capacity, observations, isActive } = req.body;
    try {
        // Busca o Lar Temporário ligado a este usuário
        const home = await prisma.temporaryHome.findUnique({
            where: { userId }
        });
        if (!home) {
            return res.status(404).json({ message: "Perfil de Lar Temporário não encontrado." });
        }
        const updatedHome = await prisma.temporaryHome.update({
            where: { userId }, // Como é 1-to-1 e userId é unique, podemos usar como chave
            data: {
                capacity,
                observations,
                isActive
            },
        });
        res.json(updatedHome);
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao atualizar perfil." });
    }
};
