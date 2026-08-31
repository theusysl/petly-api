import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
// Criar ou Atualizar Perfil de Parceiro
export const upsertPartnerProfile = async (req, res) => {
    const user = req.user;
    const data = req.body;
    // Apenas ONGs e Vets podem ter esse perfil
    if (user.role !== "ONG" && user.role !== "VET") {
        return res.status(403).json({ message: "Apenas ONGs e Veterinários podem criar este perfil." });
    }
    try {
        const profile = await prisma.partnerProfile.upsert({
            where: { userId: user.id },
            update: data, // Se existir, atualiza com os dados do body
            create: {
                ...data,
                userId: user.id,
            },
        });
        res.json(profile);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao salvar perfil de parceiro." });
    }
};
// Buscar perfil público de um parceiro (pelo ID do usuário)
export const getPartnerProfile = async (req, res) => {
    const { userId } = req.params;
    try {
        const profile = await prisma.partnerProfile.findUnique({
            where: { userId: Number(userId) },
            include: {
                user: {
                    select: { name: true, email: true, phone: true, address: true, role: true }
                }
            }
        });
        if (!profile) {
            return res.status(404).json({ message: "Perfil não encontrado." });
        }
        res.json(profile);
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao buscar perfil." });
    }
};
