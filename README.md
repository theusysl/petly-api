# Petly API - Guia de Instalação e Desenvolvimento

Bem-vindo à API do Petly! Este guia contém todos os passos necessários para configurar e rodar o projeto em um ambiente de desenvolvimento local.

## 1. Pré-requisitos

Antes de começar, garanta que você tenha os seguintes softwares instalados:

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- npm (geralmente instalado com o Node.js)
- [PostgreSQL](https://www.postgresql.org/download/) (um servidor de banco de dados local)
- Um cliente de banco de dados como [pgAdmin](https://www.pgadmin.org/) ou [DBeaver](https://dbeaver.io/) (Opcional, mas recomendado)

## 2. Configuração do Banco de Dados

A API precisa de um banco de dados PostgreSQL para funcionar.

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

No painel esquerdo, expande **Servers → seu servidor → Databases**

Clique com o direito em **Databases → Create → Database**

- Name: petly
- Owner: postgres

Clica **Save**

Pronto, agora você tem o banco petly criado.

## 3. Configuração do Projeto

0.  **Rode isso para poder usar o powershell dos pc da fatec**
    ```bash
    Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned -Force
    ```

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/theusysl/petly-api.git](https://github.com/theusysl/petly-api.git)
    cd petly-api
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Configure as Variáveis de Ambiente:**
    - Crie um arquivo chamado `.env` na raiz do projeto.
    - Copie o conteúdo do arquivo `.env.example` (se existir) ou use o modelo abaixo e cole no seu `.env`:

    ```ini
    # Arquivo .env

    # Configuração do Banco de Dados
    DATABASE_URL="postgresql://postgres:123@localhost:5432/petly?schema=public"

    # Chave secreta para os tokens JWT
    JWT_SECRET="uma_chave_secreta_forte_e_diferente_desta"

    # Porta onde a API vai rodar
    PORT=4000
    ```
    ⚠️ **Importante:** Altere `123` para as credenciais do seu banco de dados PostgreSQL.

## 4. Rodando a Aplicação

Com tudo configurado, siga estes três passos finais:

1.  **Aplique as Migrations:** Este comando vai criar todas as tabelas no seu banco `petly` com base no nosso schema.
    ```bash
    npx prisma migrate dev
    ```

2.  **Popule o Banco com Dados de Teste:** Este comando executa nosso script de seed para criar os usuários de teste (`USER`, `ONG`, `VET`, `ADMIN`).
    ```bash
    npx prisma db seed
    ```

3.  **Inicie o Servidor de Desenvolvimento:**
    ```bash
    npm run dev
    ```

🚀 Sua API Petly agora está rodando em `http://localhost:4000`.

## Scripts Principais do Projeto

- `npm run dev`: Inicia o servidor em modo de desenvolvimento com hot-reload.
- `npx prisma migrate dev`: Aplica novas migrações ao banco de dados.
- `npx prisma generate`: Regenera o Prisma Client (geralmente automático, mas útil para forçar uma atualização).
- `npx prisma db seed`: Popula o banco com os dados do arquivo `prisma/seed.ts`.
- `npx prisma studio`: Abre uma interface web para visualizar e editar os dados do seu banco.

## Próximos Passos da Fase 2

Com a Fase 1 da API concluída, os próximos grandes módulos a serem desenvolvidos são:

- **Lares Temporários:** Sistema para voluntários se cadastrarem para abrigar animais.
- **Área Educacional:** CRUD para artigos e vídeos sobre cuidados com pets.
- **Refinamento dos Perfis:** Adicionar mais detalhes aos perfis de `ONG` e `VET`.
- **Conexão com o Frontend:** Integrar a API com a aplicação Next.js.