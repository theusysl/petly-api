// src/index.ts

import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";

dotenv.config();
const app = express();

app.use(express.json());

// Rotas
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("API Petly rodando 🚀");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});