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

---

## 3. Configuração Prisma

Inicialize Prisma:

```bash
npx prisma init
```

Isso cria prisma/schema.prisma e aponta para o banco definido em DATABASE_URL.

Gere o Prisma Client:

```bash
npx prisma generate
```

Rode a migration inicial:

```bash
npx prisma migrate dev --name init
```

---

## 4. Ajustar o .env

Crie .env na raiz do projeto:

```ini
DATABASE_URL="postgresql://postgres:123@localhost:5432/petly?schema=public"
JWT_SECRET="chave_super_secreta"
PORT=4000
```

### 4.1. No arquivo .env do projeto, coloque:

⚠️ Troque 123 pela senha real que você escolheu.
⚠️ Porta padrão é 5432. Se o PostgreSQL estiver em outra porta, ajuste.

---

## 5. Conectar ao servidor PostgreSQL

No lado esquerdo, você vai ver **Servers → botão direito → Create → Server**.

###### Na aba General:

- Name: Localhost (ou qualquer nome que você queira)

###### Na aba Connection:

  - Host: localhost
  - Port: 5432
  - Username: postgres (ou usuário que você criou)
  - Password: senha que você definiu durante a instalação

  Clica em **Save**

Agora você tá conectado ao servidor local.

---

## 6. Criar o banco de dados

No painel esquerdo, expande **Servers → seu servidor → Databases**

Clique com o direito em **Databases → Create → Database**

- Name: petly
- Owner: postgres

Clica **Save**

Pronto, agora você tem o banco petly criado.

### 6.1. Dicas importantes

Não precisa mexer manualmente nas tabelas. Prisma faz isso pelas migrations.

Dados de teste: você pode inserir via Prisma Client no Node.js ou via pgAdmin → clicando com o direito em uma tabela → View/Edit Data.

Migração entre PCs: só precisa do .env e das migrations (prisma/migrations/) no repo.

---

## 7. Criar tabelas com Prisma

No seu projeto, você já tem o **prisma/schema.prisma**.

**Certifica que o .env está apontando pro banco petly**.

No terminal do projeto:

``` bash
npx prisma migrate dev --name init
```

Isso vai criar as tabelas automaticamente no banco petly.

Você pode ver as tabelas no pgAdmin: **Servers → seu servidor → Databases → petly → Schemas → public → Tables**

---

## 7.1. Testar Conexão

No terminal do projeto:

```bash
npx prisma db pull
```

Se conectar sem erro → **Prisma conseguiu falar com o PostgreSQL**.

Se der erro **P1001** → o banco não está rodando. Abra o pgAdmin e confirme que o servidor PostgreSQL está "Started".

---

## 8. Resumo do Fluxo Sempre Que Trocar de Máquina

Instalar PostgreSQL.

Criar banco **petly**.

Criar usuário + senha e dar acesso.

Atualizar .env.

Rodar:

```bash
npm install
npx prisma generate
npx prisma migrate dev
```

Pronto: API e banco funcionando!


## 9. Inicializando o Servidor

Testar:

```bash
npm run dev
```

Abrir no navegador:

```arduino
http://localhost:4000/
```

---

## 10. Próximos Passos
- Testar endpoints com Postman ou Insomnia.

- Criar CRUD de Animais, Adoções, Denúncias usando o mesmo padrão.

- Adicionar middlewares de autenticação com JWT.

- Implementar tratamento de erros centralizado.

- Conectar ao frontend Next.js via fetch/axios.

---

## 11. Dicas Gerais
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

---