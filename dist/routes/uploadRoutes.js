// src/routes/uploadRoutes.ts
import { Router } from "express";
import multer from "multer";
// MUDANÇA AQUI: Importando de ../utils em vez de ../config
import { uploadConfig } from "../utils/uploadConfig.js";
const router = Router();
const upload = multer(uploadConfig);
router.post("/", upload.single("file"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "Nenhum arquivo enviado ou formato inválido." });
    }
    const publicBaseUrl = process.env.PUBLIC_BASE_URL?.replace(/\/$/, "");
    const fileUrl = publicBaseUrl
        ? `${publicBaseUrl}/uploads/${req.file.filename}`
        : `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    res.status(201).json({
        message: "Upload realizado com sucesso!",
        url: fileUrl
    });
});
export default router;
