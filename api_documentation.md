# Documentação da API - Petly

Este documento serve como guia de referência para todos os endpoints disponíveis na API do Petly.

---
## Módulo de Autenticação / Usuários
Endpoints relacionados ao registro, login e gerenciamento de usuários.

### **Registrar Novo Usuário**
- **Endpoint:** `POST /api/users/register`
- **Descrição:** Cria um novo usuário na plataforma com o perfil padrão de `USER`.
- **Autenticação:** Não requerida.
- **Permissões:** Aberto ao público.
- **Corpo da Requisição (JSON):**
  ```json
  {
    "name": "Nome do Usuário",
    "email": "usuario@email.com",
    "password": "senha_com_min_6_chars"
  }
  ```
- **Resposta de Sucesso (201 Created):**
  ```json
  {
    "id": 1,
    "name": "Nome do Usuário",
    "email": "usuario@email.com",
    "role": "USER",
    "token": "seu_token_jwt_aqui"
  }
  ```

### **Login de Usuário**
- **Endpoint:** `POST /api/users/login`
- **Descrição:** Autentica um usuário e retorna um token JWT.
- **Autenticação:** Não requerida.
- **Permissões:** Aberto ao público.
- **Corpo da Requisição (JSON):**
  ```json
  {
    "email": "usuario@email.com",
    "password": "sua_senha"
  }
  ```
- **Resposta de Sucesso (200 OK):**
  ```json
  {
    "id": 1,
    "name": "Nome do Usuário",
    "email": "usuario@email.com",
    "role": "USER",
    "token": "seu_token_jwt_aqui"
  }
  ```

### **Listar Todos os Usuários**
- **Endpoint:** `GET /api/users`
- **Descrição:** Retorna uma lista de todos os usuários cadastrados.
- **Autenticação:** **Requerida** (Bearer Token).
- **Permissões:** Apenas `ADMIN`.
- **Resposta de Sucesso (200 OK):**
  ```json
  [
    {
      "id": 1,
      "name": "Nome do Usuário",
      "email": "usuario@email.com",
      "role": "USER",
      "createdAt": "...",
      "updatedAt": "..."
    }
  ]
  ```

### **Buscar Usuário por ID**
- **Endpoint:** `GET /api/users/:id`
- **Descrição:** Retorna os dados de um usuário específico.
- **Autenticação:** **Requerida** (Bearer Token).
- **Permissões:** Qualquer usuário autenticado.
- **Resposta de Sucesso (200 OK):**
  ```json
  {
    "id": 1,
    "name": "Nome do Usuário",
    "email": "usuario@email.com",
    "role": "USER",
    "createdAt": "...",
    "updatedAt": "..."
  }
  ```

### **Atualizar Usuário**
- **Endpoint:** `PUT /api/users/:id`
- **Descrição:** Atualiza os dados de um usuário.
- **Autenticação:** **Requerida** (Bearer Token).
- **Permissões:** Usuário autenticado (para o próprio perfil) ou `ADMIN`.
- **Corpo da Requisição (JSON):**
  ```json
  {
    "name": "Novo Nome",
    "email": "novo@email.com",
    "role": "USER"
  }
  ```
- **Resposta de Sucesso (200 OK):** Retorna o objeto do usuário atualizado.

### **Deletar Usuário**
- **Endpoint:** `DELETE /api/users/:id`
- **Descrição:** Deleta um usuário do sistema.
- **Autenticação:** **Requerida** (Bearer Token).
- **Permissões:** Apenas `ADMIN`.
- **Resposta de Sucesso (200 OK):**
  ```json
  {
    "message": "Usuário deletado com sucesso"
  }
  ```

---
## Módulo de Pets
Endpoints para o gerenciamento de animais.

### **Cadastrar Novo Pet**
- **Endpoint:** `POST /api/pets`
- **Descrição:** Cadastra um novo animal no sistema, associado ao usuário autenticado.
- **Autenticação:** **Requerida** (Bearer Token).
- **Permissões:** Qualquer usuário autenticado.
- **Corpo da Requisição (JSON):**
  ```json
  {
    "name": "Bolinha",
    "species": "Cachorro",
    "breed": "SRD",
    "age": 2,
    "description": "Muito dócil e brincalhão",
    "status": "AVAILABLE"
  }
  ```
- **Resposta de Sucesso (201 Created):** Retorna o objeto do pet criado.

### **Listar Todos os Pets**
- **Endpoint:** `GET /api/pets`
- **Descrição:** Retorna uma lista de todos os pets cadastrados e seus donos.
- **Autenticação:** Não requerida.
- **Permissões:** Aberto ao público.
- **Resposta de Sucesso (200 OK):** Retorna um array de objetos de pets.

### **Buscar Pet por ID**
- **Endpoint:** `GET /api/pets/:id`
- **Descrição:** Retorna os dados de um pet específico.
- **Autenticação:** Não requerida.
- **Permissões:** Aberto ao público.
- **Resposta de Sucesso (200 OK):** Retorna o objeto do pet.

### **Atualizar Pet**
- **Endpoint:** `PUT /api/pets/:id`
- **Descrição:** Atualiza os dados de um pet.
- **Autenticação:** **Requerida** (Bearer Token).
- **Permissões:** Dono do pet ou `ADMIN`.
- **Corpo da Requisição (JSON):**
  ```json
  {
    "name": "Bolinha",
    "description": "Muito dócil, brincalhão e vacinado",
    "status": "ADOPTED"
  }
  ```
- **Resposta de Sucesso (200 OK):** Retorna o objeto do pet atualizado.

### **Deletar Pet**
- **Endpoint:** `DELETE /api/pets/:id`
- **Descrição:** Deleta um pet do sistema.
- **Autenticação:** **Requerida** (Bearer Token).
- **Permissões:** Dono do pet ou `ADMIN`.
- **Resposta de Sucesso (200 OK):**
  ```json
  {
    "message": "Pet deletado com sucesso"
  }
  ```

---
## Módulo de Solicitações de Adoção
Endpoints para gerenciar o processo de adoção.

### **Criar Solicitação de Adoção**
- **Endpoint:** `POST /api/adoptions`
- **Descrição:** Um usuário solicita a adoção de um pet.
- **Autenticação:** **Requerida** (Bearer Token).
- **Permissões:** Qualquer usuário autenticado.
- **Corpo da Requisição (JSON):**
  ```json
  {
    "petId": 1,
    "userId": 2
  }
  ```
- **Resposta de Sucesso (201 Created):** Retorna o objeto da solicitação criada.

### **Listar Todas as Solicitações**
- **Endpoint:** `GET /api/adoptions`
- **Descrição:** Retorna uma lista de todas as solicitações de adoção.
- **Autenticação:** **Requerida** (Bearer Token).
- **Permissões:** `ADMIN` ou `ONG`. (A ser refinado no futuro).
- **Resposta de Sucesso (200 OK):** Retorna um array de objetos de solicitações.

### **Atualizar Status de uma Solicitação**
- **Endpoint:** `PATCH /api/adoptions/:id`
- **Descrição:** Aprova ou rejeita uma solicitação de adoção.
- **Autenticação:** **Requerida** (Bearer Token).
- **Permissões:** Dono do pet ou `ADMIN`.
- **Corpo da Requisição (JSON):**
  ```json
  {
    "status": "APPROVED",
    "adminUserId": 5
  }
  ```
- **Resposta de Sucesso (200 OK):** Retorna o objeto da solicitação atualizado.

### **Deletar uma Solicitação**
- **Endpoint:** `DELETE /api/events/:id`
- **Descrição:** Deleta uma solicitação de adoção do sistema.
- **Autenticação:** **Requerida** (Bearer Token).
- **Permissões:** Criador da solicitação ou `ADMIN`.
- **Resposta de Sucesso (200 OK):**
  ```json
  {
    "message": "Solicitação deletada com sucesso"
  }
  ```
---
## Módulo de Eventos
Endpoints para criação e visualização de eventos da comunidade.

### **Criar Novo Evento**
- **Endpoint:** `POST /api/events`
- **Descrição:** Cria um novo evento. O status (`APPROVED` ou `PENDING`) é definido com base no perfil do usuário.
- **Autenticação:** **Requerida** (Bearer Token).
- **Permissões:** `USER`, `ONG`, `VET`, `ADMIN`.
- **Corpo da Requisição (JSON):**
  ```json
  {
    "title": "Título do Evento",
    "description": "Descrição detalhada do que vai acontecer.",
    "date": "2025-12-01T14:00:00.000Z",
    "location": "Local do Evento"
  }
  ```
- **Resposta de Sucesso (201 Created):** Retorna o objeto do evento criado.

### **Listar Eventos Públicos**
- **Endpoint:** `GET /api/events`
- **Descrição:** Retorna uma lista de todos os eventos com status `APPROVED`.
- **Autenticação:** Não requerida.
- **Permissões:** Aberto ao público.
- **Resposta de Sucesso (200 OK):** Retorna um array de objetos de eventos.

### **Buscar Evento por ID**
- **Endpoint:** `GET /api/events/:id`
- **Descrição:** Retorna os dados de um evento específico.
- **Autenticação:** Não requerida.
- **Permissões:** Aberto ao público.
- **Resposta de Sucesso (200 OK):** Retorna o objeto do evento.

### **Atualizar Evento**
- **Endpoint:** `PUT /api/events/:id`
- **Descrição:** Atualiza os dados de um evento.
- **Autenticação:** **Requerida** (Bearer Token).
- **Permissões:** Organizador do evento ou `ADMIN`.
- **Corpo da Requisição (JSON):**
  ```json
  {
    "title": "Novo Título",
    "location": "Novo Local"
  }
  ```
- **Resposta de Sucesso (200 OK):** Retorna o objeto do evento atualizado.

### **Deletar Evento**
- **Endpoint:** `DELETE /api/events/:id`
- **Descrição:** Deleta um evento do sistema.
- **Autenticação:** **Requerida** (Bearer Token).
- **Permissões:** Organizador do evento ou `ADMIN`.
- **Resposta de Sucesso (200 OK):**
  ```json
  {
    "message": "Evento deletado com sucesso"
  }
  ```

### **Aprovar um Evento**
- **Endpoint:** `PATCH /api/events/:id/approve`
- **Descrição:** Altera o status de um evento de `PENDING` para `APPROVED`.
- **Autenticação:** **Requerida** (Bearer Token).
- **Permissões:** Apenas `ADMIN`.
- **Corpo da Requisição:** Nenhum.
- **Resposta de Sucesso (200 OK):** Retorna o objeto do evento atualizado com o novo status.
---
## Módulo de Denúncias de Maus-Tratos
Endpoints para que a comunidade possa reportar situações de vulnerabilidade animal.

### **Criar Nova Denúncia**
- **Endpoint:** `POST /api/reports`
- **Descrição:** Cria uma nova denúncia. Pode ser feita de forma anônima ou por um usuário autenticado. Se um token JWT válido for fornecido, o ID do usuário será associado à denúncia.
- **Autenticação:** Opcional.
- **Permissões:** Aberto ao público.
- **Corpo da Requisição (JSON):**
  ```json
  {
    "description": "Descrição detalhada da situação, incluindo o estado do animal e o local.",
    "photoUrl": "[https://url.da.foto/imagem.jpg](https://url.da.foto/imagem.jpg)",
    "latitude": -24.0054,
    "longitude": -46.4025
  }
  ```
- **Resposta de Sucesso (201 Created):**
  ```json
  {
    "id": 1,
    "description": "Descrição detalhada...",
    "photoUrl": "[https://url.da.foto/imagem.jpg](https://url.da.foto/imagem.jpg)",
    "videoUrl": null,
    "latitude": -24.0054,
    "longitude": -46.4025,
    "status": "OPEN",
    "createdAt": "2025-09-22T23:45:00.000Z",
    "reporterId": 2 // ou null se a denúncia for anônima
  }
  ```