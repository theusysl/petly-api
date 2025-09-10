# Petly API - Guia de Desenvolvimento

## 1. Pré-requisitos

- [Node.js >= 18](https://nodejs.org/pt/download)  
- npm  
- [PostgreSQL](https://www.postgresql.org/download/windows/)
- VSCode ou outro editor de código  
- Prisma (já instalado via npm)

---

## 2. Configuração Inicial

Clone o repositório:

```bash
git clone <repo_url>
cd petly-api
```

Rode:

```bash
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned -Force
```

Instale dependências:

```bash
npm install
```

Crie .env na raiz do projeto:

```ini
DATABASE_URL="postgresql://usuario:senha@localhost:5432/petly"
JWT_SECRET="chave_super_secreta"
PORT=4000
```

Inicialize Prisma:

```bash
npx prisma init
```

Isso cria prisma/schema.prisma e aponta para o banco definido em DATABASE_URL.

## 3. Configuração TypeScript / ESM

No tsconfig.json:
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "NodeNext",
    "rootDir": "src",
    "outDir": "dist",
    "strict": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true
  }
}
```

No package.json:
```json
{
  "type": "module",
  "scripts": {
    "dev": "node --loader ts-node/esm src/index.ts",
    "start": "node dist/index.js"
  }
}
```

## 4. Estrutura de Pastas Recomendada
```pgsql
Copiar código
petly-api/
├─ prisma/
│  └─ schema.prisma
├─ src/
│  ├─ controllers/
│  │  └─ userController.ts
│  ├─ routes/
│  │  └─ userRoutes.ts
│  ├─ middlewares/
│  ├─ services/
│  └─ index.ts
├─ package.json
├─ tsconfig.json
└─ .env
```

## 5. Inicializando o Servidor
src/index.ts mínimo para teste:

```ts
import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Petly rodando!");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
```

Testar:

```bash
npm run dev
```

Abrir no navegador:

```arduino
http://localhost:4000/
```

## 6. Configuração Prisma
Defina o modelo inicial no prisma/schema.prisma:

```prisma
model User {
  id       Int    @id @default(autoincrement())
  name     String
  email    String @unique
  password String
  role     String @default("USER")
}
```

Gere o Prisma Client:

```bash
npx prisma generate
```

Rode a migration inicial:

```bash
npx prisma migrate dev --name init
```

## 7. Importando Prisma no ESM
```ts
import pkg from "@prisma/client";
const { PrismaClient } = pkg;
const prisma = new PrismaClient();
export default prisma;
```

⚠️ Sublinhados no VSCode podem aparecer, mas não quebram o runtime.

## 8. Criando Rotas e Controllers
src/routes/userRoutes.ts:

```ts
import { Router } from "express";
import { registerUser, loginUser } from "../controllers/userController.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
```

src/controllers/userController.ts:

```ts
import pkg from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword }
    });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: "Email já existe" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(400).json({ error: "Usuário não encontrado" });
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ error: "Senha inválida" });
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1d" });
  res.json({ token });
};
```

## 9. Próximos Passos
- Testar endpoints com Postman ou Insomnia.

- Criar CRUD de Animais, Adoções, Denúncias usando o mesmo padrão.

- Adicionar middlewares de autenticação com JWT.

- Implementar tratamento de erros centralizado.

- Conectar ao frontend Next.js via fetch/axios.

## 10. Dicas Gerais
Sempre que mudar schema.prisma:

```bash
npx prisma generate
npx prisma migrate dev --name <nome_migration>
```

Se mudar de máquina, rode sempre:

```bash
npm install
npx prisma generate
```

Para ESM + TS, use sempre:

```ts
import pkg from "@prisma/client";
const { PrismaClient } = pkg;
```

Console.log de objetos do Prisma podem aparecer como [Object: null prototype] → normal.

---