// src/middlewares/authMiddleware.ts

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  id: number;
  role: string;
}

export const protect = (req: Request, res: Response, next: NextFunction) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

      // injeta o usuário decodificado no request
      (req as any).user = decoded;

      return next();
    } catch (error) {
      return res.status(401).json({ message: "Token inválido ou expirado" });
    }
  }

  return res.status(401).json({ message: "Não autorizado, token ausente" });
};

export const authorize =
  (...roles: string[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    if (roles.includes((req as any).user?.role)) {
      return next();
    }
    return res.status(403).json({ message: "Acesso negado" });
  };
