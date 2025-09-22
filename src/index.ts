// src/index.ts
import express from "express";
import dotenv from "dotenv";

import userRoutes from "./routes/userRoutes.js";
import petRoutes from "./routes/petRoutes.js";
import adoptionRequestRoutes from "./routes/adoptionRequestRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";

dotenv.config();
const app = express();

app.use(express.json());

// Rotas
app.use("/api/users", userRoutes);
app.use("/api/pets", petRoutes);
app.use("/api/adoptions", adoptionRequestRoutes);
app.use("/api/events", eventRoutes);

app.get("/", (req, res) => {
  res.send("API Petly rodando 🚀");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});