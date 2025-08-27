import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import pkg from "@prisma/client";
import { generateToken } from "../utils/generateToken.js";

const prisma = new PrismaClient();
export default prisma;

// Registrar usuário
export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;

  try {
    const userExists = await prisma.user.findUnique({ where: { email } });
    if (userExists) return res.status(400).json({ message: "Usuário já existe" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword, role },
    });

    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user.id, user.role),
    });
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor", error });
  }
};

// Login usuário
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ message: "Credenciais inválidas" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).json({ message: "Credenciais inválidas" });

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user.id, user.role),
    });
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor", error });
  }
};
