// src/controllers/eventController.ts

import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Criar um novo evento
export const createEvent = async (req: Request, res: Response) => {
    // 1. Pega os dados do corpo da requisição
    const { title, description, date, location } = req.body;
    
    // 2. Pega o ID do usuário logado (organizador) a partir do token
    const organizerId = (req as any).user.id;

    // 3. Validação básica para garantir que os campos obrigatórios foram enviados
    if (!title || !description || !date || !location) {
        return res.status(400).json({ message: "Todos os campos são obrigatórios: título, descrição, data e local." });
    }

    try {
        // 4. Cria o evento no banco de dados
        const newEvent = await prisma.event.create({
            data: {
                title,
                description,
                date: new Date(date), // Converte a string de data para o formato Date
                location,
                organizerId, // Associa o evento ao usuário logado
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
    // Lógica para buscar um evento virá aqui
    res.status(501).json({ message: "Rota não implementada" });
};

// Atualizar um evento
export const updateEvent = async (req: Request, res: Response) => {
    // Lógica para atualizar o evento virá aqui
    res.status(501).json({ message: "Rota não implementada" });
};

// Deletar um evento
export const deleteEvent = async (req: Request, res: Response) => {
    // Lógica para deletar o evento virá aqui
    res.status(501).json({ message: "Rota não implementada" });
};