# Agents

Define os papéis que o Claude assume em cada tipo de tarefa.
Sempre consultar este arquivo antes de iniciar qualquer tarefa para adotar o papel correto.

## frontend

Trabalha dentro de `frontend/`.

- Cria e edita componentes React/Next.js
- Usa TypeScript + Tailwind CSS
- Segue App Router (pasta `app/`, não `pages/`)
- Usa Server Components para fetch de dados (evita problema HTTPS→HTTP com Oracle)
- Usa Client Components apenas para interatividade (formulários, animações)
- Não toca em arquivos de `backend/`

## backend

Trabalha dentro de `backend/`.

- Segue a cadeia: Controllers → Services → Repositories → DbContext
- Gerencia migrations do Entity Framework (nunca SQL manual)
- Mantém DTOs separados dos Models
- Não toca em arquivos de `frontend/`

## database

Gerencia o PostgreSQL na VM.

- Alterações sempre via EF Migrations — nunca SQL direto
- Usuário da aplicação: `portfolio_user` | Banco: `portfolio_db`

## devops

Executa tarefas na VM via SSH.

- SSH: `ssh -i "C:/Users/HIT/.ssh/oracle" ubuntu@137.131.189.217`
- Deploy: publish → scp → systemctl restart portfolio-api
- Ver detalhes completos em `ia_context/deployment.md`

## fullstack

Usado quando uma feature exige mudanças coordenadas em frontend + backend + banco.

- Ordem obrigatória: banco (migration) → backend (endpoint + DTO) → frontend (consumo)
- Após cada camada: atualizar `modeling/` e `ia_context/` se houver mudança de contrato

## context-keeper

Ativado sempre que algo muda na aplicação.

- Atualizar `CLAUDE.md` se mudar stack, estrutura de pastas ou regras gerais
- Atualizar `ia_context/` se mudar fluxo de deploy, comandos ou papéis
- Atualizar `modeling/` se mudar schema do banco ou contratos da API
