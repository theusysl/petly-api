// src/middlewares/authMiddleware.ts
import jwt from "jsonwebtoken";
export const protect = (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // injeta o usuário decodificado no request
            req.user = decoded;
            return next();
        }
        catch (error) {
            return res.status(401).json({ message: "Token inválido ou expirado" });
        }
    }
    return res.status(401).json({ message: "Não autorizado, token ausente" });
};
export const authorize = (...roles) => (req, res, next) => {
    if (roles.includes(req.user?.role)) {
        return next();
    }
    return res.status(403).json({ message: "Acesso negado" });
};
