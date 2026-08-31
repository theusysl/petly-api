import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const getGeneralStats = async (req, res) => {
    try {
        // Executa várias queries em paralelo para ser rápido
        const [totalUsers, totalPets, petsAdopted, activeReports, totalEvents] = await Promise.all([
            // 1. Total de usuários
            prisma.user.count(),
            // 2. Total de animais cadastrados
            prisma.pet.count(),
            // 3. Animais que já foram adotados (Sucesso!)
            prisma.pet.count({ where: { status: "ADOPTED" } }),
            // 4. Denúncias que ainda não foram resolvidas
            prisma.report.count({
                where: {
                    status: { not: "RESOLVED" } // Tudo que não está resolvido
                }
            }),
            // 5. Eventos futuros
            prisma.event.count({
                where: { date: { gte: new Date() } }
            })
        ]);
        res.json({
            users: totalUsers,
            pets: {
                total: totalPets,
                adopted: petsAdopted,
                available: totalPets - petsAdopted
            },
            reports: {
                active: activeReports
            },
            events: {
                upcoming: totalEvents
            }
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao carregar estatísticas." });
    }
};
