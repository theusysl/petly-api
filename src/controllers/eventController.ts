// src/controllers/eventController.ts

import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Criar um novo evento
export const createEvent = async (req: Request, res: Response) => {
    // 1. Pega os dados do corpo da requisição
    const { title, description, date, location } = req.body;
    
    // 2. Pega o ID do usuário logado (organizador) a partir do token
    const user = (req as any).user;

    // 3. Validação básica para garantir que os campos obrigatórios foram enviados
    if (!title || !description || !date || !location) {
        return res.status(400).json({ message: "Todos os campos são obrigatórios." });
    }

    // Lógica de Status CORRIGIDA: ADMIN, ONG e VET aprovam eventos automaticamente
    const status = (user.role === 'ADMIN' || user.role === 'ONG' || user.role === 'VET') 
        ? 'APPROVED' 
        : 'PENDING';

    try {
        // 4. Cria o evento no banco de dados
        const newEvent = await prisma.event.create({
            data: {
                title,
                description,
                date: new Date(date),
                location,
                organizerId: user.id,
                status: status,
            },
        });

        // 5. Retorna o evento criado com sucesso
        res.status(201).json(newEvent);

    } catch (error) {
        console.error("Erro ao criar evento:", error);
        res.status(500).json({ message: "Erro interno ao criar o evento." });
    }
};

// Obter todos os eventos
export const getAllEvents = async (req: Request, res: Response) => {
    try {
        // Busca todos os eventos no banco de dados
        const events = await prisma.event.findMany({
            where: {
                status: 'APPROVED' // <-- Só retorna eventos aprovados
            },
            orderBy: {
                date: 'asc', // Ordena os eventos por data, do mais próximo para o mais distante
            },
            // Inclui os dados do organizador na resposta
            include: {
                organizer: {
                    // Seleciona apenas os campos seguros do usuário organizador
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        role: true,
                    }
                }
            }
        });

        res.status(200).json(events);

    } catch (error) {
        console.error("Erro ao listar eventos:", error);
        res.status(500).json({ message: "Erro interno ao listar os eventos." });
    }
};

// Obter um evento por ID
export const getEventById = async (req: Request, res: Response) => {
    const { id } = req.params;
    // Pega o usuário logado. Se não estiver logado, 'user' será undefined.
    const user = (req as any).user; 

    try {
        const event = await prisma.event.findUnique({
            where: { id: Number(id) },
            include: {
                organizer: {
                    select: { id: true, name: true, email: true, role: true }
                }
            }
        });

        if (!event) {
            return res.status(404).json({ message: "Evento não encontrado." });
        }

        // NOVA REGRA DE NEGÓCIO:
        // Se o status do evento NÃO for 'APPROVED'...
        if (event.status !== 'APPROVED') {
            // ...verificamos se há um usuário logado E se ele NÃO é o organizador E se ele NÃO é um admin.
            // Se todas essas condições forem verdadeiras, o acesso é negado.
            if (!user || (user.id !== event.organizerId && user.role !== 'ADMIN')) {
                return res.status(404).json({ message: "Evento não encontrado ou pendente de aprovação." });
            }
        }

        // Se o evento for 'APPROVED' ou se o usuário tiver permissão, retorna o evento.
        res.status(200).json(event);

    } catch (error) {
        console.error("Erro ao buscar evento por ID:", error);
        res.status(500).json({ message: "Erro interno ao buscar o evento." });
    }
};

// Atualizar um evento
export const updateEvent = async (req: Request, res: Response) => {
    const { id } = req.params; // ID do evento a ser atualizado
    const user = (req as any).user; // Usuário logado que está fazendo a requisição
    const { title, description, date, location } = req.body; // Novos dados para o evento

    try {
        // 1. Busca o evento original no banco
        const eventToUpdate = await prisma.event.findUnique({
            where: { id: Number(id) },
        });

        // 2. Verifica se o evento existe
        if (!eventToUpdate) {
            return res.status(404).json({ message: "Evento não encontrado." });
        }

        // 3. LÓGICA DE AUTORIZAÇÃO: Verifica se o usuário é o organizador ou um ADMIN
        if (eventToUpdate.organizerId !== user.id && user.role !== "ADMIN") {
            return res.status(403).json({ message: "Acesso negado. Você não tem permissão para editar este evento." });
        }

        // 4. Se a autorização passar, atualiza o evento
        const updatedEvent = await prisma.event.update({
            where: { id: Number(id) },
            data: {
                title,
                description,
                date: new Date(date),
                location,
            },
        });

        res.status(200).json(updatedEvent);

    } catch (error) {
        console.error("Erro ao atualizar evento:", error);
        res.status(500).json({ message: "Erro interno ao atualizar o evento." });
    }
};

// Deletar um evento
export const deleteEvent = async (req: Request, res: Response) => {
    const { id } = req.params; // ID do evento a ser deletado
    const user = (req as any).user; // Usuário logado

    try {
        // 1. Busca o evento no banco
        const eventToDelete = await prisma.event.findUnique({
            where: { id: Number(id) },
        });

        // 2. Verifica se o evento existe
        if (!eventToDelete) {
            return res.status(404).json({ message: "Evento não encontrado." });
        }

        // 3. LÓGICA DE AUTORIZAÇÃO: Verifica se o usuário é o organizador ou um ADMIN
        if (eventToDelete.organizerId !== user.id && user.role !== "ADMIN") {
            return res.status(403).json({ message: "Acesso negado. Você não tem permissão para deletar este evento." });
        }

        // 4. Se a autorização passar, deleta o evento
        await prisma.event.delete({
            where: { id: Number(id) },
        });

        res.status(200).json({ message: "Evento deletado com sucesso" });

    } catch (error) {
        console.error("Erro ao deletar evento:", error);
        res.status(500).json({ message: "Erro interno ao deletar o evento." });
    }
};

// Aprovar um evento pendente
export const approveEvent = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const eventToApprove = await prisma.event.findUnique({ where: { id: Number(id) } });

        if (!eventToApprove) {
            return res.status(404).json({ message: "Evento não encontrado." });
        }

        const updatedEvent = await prisma.event.update({
            where: { id: Number(id) },
            data: {
                status: 'APPROVED',
            },
        });

        res.status(200).json(updatedEvent);
    } catch (error) {
        console.error("Erro ao aprovar evento:", error);
        res.status(500).json({ message: "Erro interno ao aprovar o evento." });
    }
};