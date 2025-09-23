// src/index.ts

// Importações principais
import express from "express";
import dotenv from "dotenv";

// Importar rotas
import userRoutes from "./routes/userRoutes.js";
import petRoutes from "./routes/petRoutes.js";
import adoptionRequestRoutes from "./routes/adoptionRequestRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import cors from "cors";

// Configuração do dotenv e inicialização do app
dotenv.config();
const app = express();

// Isso vai permitir que qualquer origem se conecte. Para produção, podemos restringir.
app.use(cors()); 

// Middleware para parsear JSON
app.use(express.json());

// Rotas
app.use("/api/users", userRoutes);
app.use("/api/pets", petRoutes);
app.use("/api/adoptions", adoptionRequestRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/reports", reportRoutes);

// Rota raiz para verificar se a API está rodando
app.get("/", (req, res) => {
  res.send("API Petly rodando 🚀");
});

// Iniciar o servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});