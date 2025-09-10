# Guia PostgreSQL para o Petly API

## 1. Criar o Banco no pgAdmin

1. Abra o **pgAdmin**.  
2. Clique com o botão direito em **Databases > Create > Database...**.  
3. Nomeie como `petly` e clique em **Save**.  

✅ Agora o banco vazio está criado.

---

## 2. Configurar Usuário e Senha

1. Vá em **Login/Group Roles > Create > Login/Group Role...**.  
2. Nomeie como `petly_user`.  
3. Na aba **Definition**, defina uma senha (`petly_pass` por exemplo).  
4. Na aba **Privileges**, marque:  
   - Can login? ✅  
   - Superuser ❌ (não precisa)  

5. Salve.

---

## 3. Dar Permissão no Banco

1. Clique com o botão direito no banco `petly` > **Properties**.  
2. Aba **Security** → adicione o usuário `petly_user` com privilégios de:  
   - CONNECT  
   - CREATE  
   - TEMPORARY  

3. Abra o **Query Tool** no banco `petly` e rode:

```sql
GRANT ALL PRIVILEGES ON DATABASE petly TO petly_user;
```

---

## 4. Ajustar o .env

No arquivo .env do projeto, coloque:

```DATABASE_URL="postgresql://postgres:1@localhost:5432/petly?schema=public"```

⚠️ Troque petly_pass pela senha real que você escolheu.
⚠️ Porta padrão é 5432. Se o PostgreSQL estiver em outra porta, ajuste.

---

## 5. Testar Conexão

No terminal do projeto:

```bash
npx prisma db pull
```

Se conectar sem erro → Prisma conseguiu falar com o PostgreSQL.

Se der erro P1001 → o banco não está rodando. Abra o pgAdmin e confirme que o servidor PostgreSQL está "Started".

---

## 6. Criar Tabelas

Depois que o banco estiver conectado:

```bash
npx prisma migrate dev --name init
```

Isso cria as tabelas definidas em prisma/schema.prisma dentro do banco petly.

Para visualizar no pgAdmin:

Expanda o banco petly > Schemas > public > Tables.

Você verá User (e outros modelos que forem criados).

---

## 7. Resumo do Fluxo Sempre Que Trocar de Máquina

Instalar PostgreSQL.

Criar banco petly.

Criar usuário + senha e dar acesso.

Atualizar .env.

Rodar:

```bash
npm install
npx prisma generate
npx prisma migrate dev
```

Pronto: API e banco funcionando!

---

👉 Assim você fecha o ciclo: **PostgreSQL (pgAdmin)** ↔ **Prisma** ↔ **API Express**.