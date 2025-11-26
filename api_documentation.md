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

  # Documentação da API - Petly

Este documento serve como guia de referência para todos os endpoints disponíveis na API do Petly.

**Base URL:** `http://localhost:3000/api`

---

## 1. Módulo de Autenticação / Usuários
Endpoints relacionados ao registro, login e gerenciamento de usuários.

### **Registrar Novo Usuário**
- **Endpoint:** `POST /api/users/register`
- **Descrição:** Cria um novo usuário na plataforma com o perfil padrão de `USER`.
- **Autenticação:** Não requerida.
- **Corpo da Requisição (JSON):**
  ```json
  {
    "name": "Nome do Usuário",
    "email": "usuario@email.com",
    "password": "senha_com_min_6_chars"
  }
  ```

- **Resposta de Sucesso (201 Created):**
  ```
  {
    "id": 1,
    "name": "Nome do Usuário",
    "email": "usuario@email.com",
    "role": "USER",
    "token": "seu_token_jwt_aqui"
  }
  ```

  Login de Usuário
Endpoint: POST /api/users/login

Descrição: Autentica um usuário e retorna um token JWT.

Autenticação: Não requerida.

Corpo da Requisição (JSON):

JSON

{
  "email": "usuario@email.com",
  "password": "sua_senha"
}
Buscar Usuário por ID
Endpoint: GET /api/users/:id

Descrição: Retorna os dados de um usuário específico.

Autenticação: Requerida (Bearer Token).

Atualizar Usuário
Endpoint: PUT /api/users/:id

Descrição: Atualiza os dados de um usuário.

Autenticação: Requerida (Bearer Token).

Corpo da Requisição (JSON):

JSON

{
  "name": "Novo Nome",
  "email": "novo@email.com"
}
2. Módulo de Upload (Imagens)
Endpoint para envio de arquivos de imagem. Necessário para obter a URL da foto antes de cadastrar Pets ou Denúncias.

Fazer Upload de Imagem
Endpoint: POST /api/upload

Descrição: Envia uma imagem para o servidor e retorna uma URL pública.

Autenticação: Não requerida.

Tipo de Requisição: multipart/form-data

Corpo da Requisição:

Campo: file (Arquivo de imagem: .jpg, .png, etc)

Resposta de Sucesso (201 Created):

JSON

{
  "message": "Upload realizado com sucesso!",
  "url": "http://localhost:3000/uploads/170999123-imagem.jpg"
}
3. Módulo de Pets
Endpoints para o gerenciamento de animais.

Cadastrar Novo Pet
Endpoint: POST /api/pets

Descrição: Cadastra um novo animal no sistema.

Autenticação: Requerida (Bearer Token).

Corpo da Requisição (JSON):

JSON

{
  "name": "Bolinha",
  "species": "Cachorro",
  "breed": "SRD",
  "age": 2,
  "description": "Muito dócil e brincalhão",
  "status": "AVAILABLE",
  "photoUrl": "http://localhost:3000/uploads/foto-do-pet.jpg",
  "latitude": -23.5505,
  "longitude": -46.6333
}
Listar Todos os Pets
Endpoint: GET /api/pets

Descrição: Retorna uma lista de todos os pets cadastrados e seus donos.

Autenticação: Não requerida.

Buscar Pet por ID
Endpoint: GET /api/pets/:id

Descrição: Retorna os dados de um pet específico.

Autenticação: Não requerida.

Atualizar Pet
Endpoint: PUT /api/pets/:id

Descrição: Atualiza os dados de um pet.

Autenticação: Requerida (Dono ou Admin).

Corpo da Requisição (JSON): (Campos opcionais)

JSON

{
  "status": "ADOPTED",
  "description": "Adotado com sucesso!"
}
Deletar Pet
Endpoint: DELETE /api/pets/:id

Descrição: Deleta um pet do sistema.

Autenticação: Requerida (Dono ou Admin).

4. Módulo de Lares Temporários
Conecta tutores e ONGs a voluntários dispostos a abrigar animais.

Listar Lares Disponíveis
Endpoint: GET /api/temporary-homes

Descrição: Lista todos os voluntários com perfil ativo.

Autenticação: Não requerida (Público).

Cadastrar-se como Lar Temporário
Endpoint: POST /api/temporary-homes

Descrição: Registra o usuário logado como um voluntário.

Autenticação: Requerida (Bearer Token).

Corpo da Requisição (JSON):

JSON

{
  "capacity": 2,
  "observations": "Aceito apenas gatos ou cães de pequeno porte."
}
Atualizar Meu Perfil de Lar
Endpoint: PUT /api/temporary-homes/me

Descrição: Atualiza a capacidade, observações ou pausa o recebimento de animais.

Autenticação: Requerida (Bearer Token).

Corpo da Requisição (JSON):

JSON

{
  "capacity": 3,
  "isActive": true,
  "observations": "Agora aceito cães médios."
}
5. Módulo de Solicitações de Adoção
Endpoints para gerenciar o processo de adoção.

Criar Solicitação de Adoção
Endpoint: POST /api/adoption-requests

Descrição: Um usuário solicita a adoção de um pet.

Autenticação: Requerida (Bearer Token).

Corpo da Requisição (JSON):

JSON

{
  "petId": 1
}
Listar Solicitações
Endpoint: GET /api/adoption-requests

Descrição: Retorna uma lista de todas as solicitações.

Autenticação: Requerida (Apenas ADMIN ou ONG).

Atualizar Status (Aprovar/Rejeitar)
Endpoint: PATCH /api/adoption-requests/:id

Descrição: Aprova ou rejeita uma solicitação.

Autenticação: Requerida (Dono do Pet ou Admin).

Corpo da Requisição (JSON):

JSON

{
  "status": "APPROVED" 
}
6. Módulo de Eventos
Endpoints para criação e visualização de eventos da comunidade.

Criar Novo Evento
Endpoint: POST /api/events

Descrição: Cria um novo evento. Status APPROVED automático para ONGs/Vets/Admins, PENDING para usuários comuns.

Autenticação: Requerida (Bearer Token).

Corpo da Requisição (JSON):

JSON

{
  "title": "Feira de Adoção",
  "description": "Venha adotar seu melhor amigo!",
  "date": "2025-12-25",
  "location": "Parque Central"
}
Listar Eventos Públicos
Endpoint: GET /api/events

Descrição: Retorna uma lista de todos os eventos com status APPROVED.

Autenticação: Não requerida.

Aprovar um Evento
Endpoint: PATCH /api/events/:id/approve

Descrição: Altera o status de um evento de PENDING para APPROVED.

Autenticação: Requerida (Apenas ADMIN).

7. Módulo de Denúncias (Maus-Tratos)
Endpoints para reportar situações de vulnerabilidade.

Criar Nova Denúncia
Endpoint: POST /api/reports

Descrição: Cria uma nova denúncia. Pode ser anônima ou logada.

Autenticação: Opcional.

Corpo da Requisição (JSON):

JSON

{
  "description": "Animal abandonado na praça central.",
  "photoUrl": "http://localhost:3000/uploads/denuncia.jpg",
  "latitude": -24.0054,
  "longitude": -46.4025
}
Listar Denúncias
Endpoint: GET /api/reports

Autenticação: Requerida (Apenas ADMIN).

8. Módulo Educacional
Conteúdos informativos sobre cuidados e leis.

Listar Conteúdos
Endpoint: GET /api/educational

Descrição: Lista todos os artigos, vídeos e guias.

Autenticação: Não requerida (Público).

Criar Conteúdo
Endpoint: POST /api/educational

Descrição: Publica um novo material educativo.

Autenticação: Requerida (Apenas ADMIN, ONG ou VET).

Corpo da Requisição (JSON):

JSON

{
  "title": "Guia de Vacinação 2025",
  "type": "guia", 
  "url": "[https://youtube.com/](https://youtube.com/)..."
}
9. Módulo de Parceiros (ONGs/Vets)
Gerenciamento de perfis estendidos.

Visualizar Perfil Público
Endpoint: GET /api/partners/:userId

Descrição: Busca os dados estendidos de um parceiro pelo ID do Usuário.

Autenticação: Não requerida.

Criar ou Atualizar Perfil
Endpoint: PUT /api/partners

Descrição: Cria (se não existir) ou atualiza os dados de parceiro do usuário logado.

Autenticação: Requerida (Apenas ONG ou VET).

Corpo da Requisição (JSON):

JSON

{
  "cnpj": "12.345.678/0001-90",
  "website": "[https://minhaong.org](https://minhaong.org)",
  "pixKey": "email@pix.com",
  "openingHours": "Seg-Sex 08h-18h",
  "services": "Castração, Vacinação",
  "description": "Sobre nós..."
}
10. Módulo de Estatísticas (Dashboard)
Dados consolidados para administração.

Obter Estatísticas Gerais
Endpoint: GET /api/stats

Descrição: Retorna contagens de usuários, pets, adoções e eventos.

Autenticação: Requerida (Apenas ADMIN ou ONG).

Resposta de Sucesso (200 OK):

JSON

{
  "users": 150,
  "pets": { "total": 50, "adopted": 12, "available": 38 },
  "reports": { "active": 5 },
  "events": { "upcoming": 2 }
}