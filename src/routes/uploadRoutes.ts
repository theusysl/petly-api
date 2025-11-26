// src/routes/uploadRoutes.ts

import { Router, Request, Response } from "express";
import multer from "multer";

// MUDANÇA AQUI: Importando de ../utils em vez de ../config
import { uploadConfig } from "../utils/uploadConfig.js"; 

const router = Router();
const upload = multer(uploadConfig);

router.post("/", upload.single("file"), (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ message: "Nenhum arquivo enviado ou formato inválido." });
  }

  const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

  res.status(201).json({ 
    message: "Upload realizado com sucesso!",
    url: fileUrl 
  });
});

export default router;