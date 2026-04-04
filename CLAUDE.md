# site-canal — Portfolio Project

## Stack
- **Frontend:** Next.js (App Router) — hospedado no Vercel
- **Backend:** C# ASP.NET Core 8 (Web API) — hospedado na Oracle Cloud VM
- **Banco:** PostgreSQL 14 — rodando na mesma VM do backend
- **Servidor:** Ubuntu 22.04 ARM, IP `137.131.189.217`

## Estrutura de pastas
```
site_canal/
├── frontend/        # Next.js app
├── backend/         # C# ASP.NET Core API
├── ia_context/      # Arquivos de referência para agentes de IA (agents.md, skills.md, deployment.md)
├── modeling/        # Conceitos de modelagem das diferentes áreas da aplicação (banco, API)
└── CLAUDE.md        # Este arquivo
```

## Regras de desenvolvimento
- Frontend usa TypeScript, Tailwind CSS e App Router (pasta `app/`)
- Backend segue arquitetura em camadas: Controllers → Services → Repositories
- Banco de dados gerenciado via Entity Framework Core com Migrations
- Variáveis sensíveis (connection strings, secrets) sempre em `.env` / `appsettings.json` — nunca hardcoded
- Nenhum arquivo `.env` ou `appsettings.Production.json` é commitado

## Deploy
- **Frontend:** push para `main` no GitHub → Vercel faz deploy automático
- **Backend:** `dotnet publish` local → `scp` para VM → `systemctl restart api`
- Detalhes completos em `ia_context/deployment.md`

## Conexão com a VM
```bash
ssh -i "C:/Users/HIT/.ssh/oracle" ubuntu@137.131.189.217
```

## Banco de dados (na VM)
- Usuário: `portfolio_user`
- Database: `portfolio_db`
- Porta: `5432` (local apenas, não exposta externamente)
