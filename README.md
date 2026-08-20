<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<h1 align="center">Dairy Management API</h1>

<p align="center">
  API REST para gestão de produção leiteira (estoque, financeiro, administrativo e identidade/autenticação).<br/>
  Projeto de <strong>TCC</strong> (Trabalho de Conclusão de Curso).
</p>

## Sobre o projeto

Backend construído em [NestJS](https://nestjs.com/) + [Prisma](https://www.prisma.io/) (PostgreSQL), com autenticação/autorização via [Keycloak](https://www.keycloak.org/). Organiza o domínio da aplicação em módulos:

- **Stock** — produtos
- **Finance** — transações e saldo
- **Administrative** — fazendas (farms)
- **Identity** — pessoas e autenticação
- **Parameters** — centro de custo, tipos de transação, unidades de medida

## Stack

- [NestJS](https://nestjs.com/) (Node.js / TypeScript)
- [Prisma ORM](https://www.prisma.io/) + PostgreSQL
- [Keycloak](https://www.keycloak.org/) (autenticação/autorização via JWT)
- [Swagger](https://swagger.io/) (documentação da API, ambiente `dev`)
- [Docker Compose](https://docs.docker.com/compose/) (Postgres + Keycloak)

## Pré-requisitos

- Node.js 20+
- [pnpm](https://pnpm.io/)
- Docker e Docker Compose

## Como rodar

### 1. Configure as variáveis de ambiente

Copie `.env.example` para `.env` e preencha os valores:

```bash
cp .env.example .env
```

| Variável | Descrição |
| --- | --- |
| `PORT` | Porta em que a API vai subir |
| `DATABASE_URL` | String de conexão do PostgreSQL (Prisma) |
| `KEYCLOAK_URL` | URL do servidor Keycloak |
| `KEYCLOAK_REALM` | Realm configurado no Keycloak |
| `KEYCLOAK_CLIENT_ID` | Client ID da aplicação no Keycloak |
| `KEYCLOAK_CLIENT_SECRET` | Client Secret da aplicação no Keycloak |
| `KEYCLOAK_PUBLIC_KEY` | Chave pública do realm (validação do JWT) |
| `POSTGRES_USER` | Usuário do Postgres criado pelo `docker-compose.yml` |
| `POSTGRES_PASSWORD` | Senha do Postgres criado pelo `docker-compose.yml` |
| `POSTGRES_DB` | Nome do banco criado pelo `docker-compose.yml` |
| `KEYCLOAK_ADMIN` | Usuário admin do Keycloak (container) |
| `KEYCLOAK_ADMIN_PASSWORD` | Senha admin do Keycloak (container) |

O `docker-compose.yml` lê essas variáveis do `.env` — nenhuma credencial fica hardcoded no arquivo.

### 2. Suba a infraestrutura (Postgres + Keycloak)

```bash
docker compose up -d
```

### 3. Instale as dependências

```bash
pnpm install
```

### 4. Rode as migrations e o seed

```bash
pnpm prisma:migration
pnpm prisma:seed
pnpm prisma:roles
```

### 5. Suba a API

```bash
# desenvolvimento (watch mode)
pnpm start:dev

# produção
pnpm build
pnpm start:prod
```

Com `NODE_ENV=dev`, a documentação Swagger fica disponível na raiz da aplicação.

## Scripts úteis

| Script | Descrição |
| --- | --- |
| `pnpm start:dev` | Sobe a API em watch mode |
| `pnpm build` | Gera o client do Prisma e builda o projeto |
| `pnpm test` | Roda os testes unitários |
| `pnpm test:e2e` | Roda os testes end-to-end |
| `pnpm prisma:studio` | Abre o Prisma Studio |
| `pnpm prisma:migration` | Cria/aplica migrations em desenvolvimento |
| `pnpm prisma:deploy` | Aplica migrations em produção |
| `pnpm lint:fix` | Roda o ESLint com autofix |

## Licença

Projeto acadêmico (TCC), sem licença de uso comercial definida.
