// src/index.ts

// Importações principais
import express from "express";
import dotenv from "dotenv";

import path from "path";
import { fileURLToPath } from "url";

// Importar rotas
import userRoutes from "./routes/userRoutes.js";
import petRoutes from "./routes/petRoutes.js";
import adoptionRequestRoutes from "./routes/adoptionRequestRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import temporaryHomeRoutes from "./routes/temporaryHomeRoutes.js";
import educationalRoutes from "./routes/educationalRoutes.js";
import partnerRoutes from "./routes/partnerRoutes.js"
import uploadRoutes from "./routes/uploadRoutes.js";
import statsRoutes from "./routes/statsRoutes.js";

import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuração do dotenv e inicialização do app
dotenv.config();
const app = express();

// Isso vai permitir que qualquer origem se conecte. Para produção, podemos restringir.
app.use(cors()); 

// Middleware para parsear JSON com limite aumentado para imagens base64
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rotas
app.use("/uploads", express.static(path.resolve(__dirname, "..", "uploads")));

app.use("/api/users", userRoutes);
app.use("/api/pets", petRoutes);
app.use("/api/adoptions", adoptionRequestRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/temporary-homes", temporaryHomeRoutes);
app.use("/api/educational", educationalRoutes);
app.use("/api/partners", partnerRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/stats", statsRoutes);

// Rota raiz para verificar se a API está rodando
app.get("/", (req, res) => {
  res.send("API Petly rodando 🚀");
});

// Iniciar o servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});