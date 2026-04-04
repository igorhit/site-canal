# Legends of Runeterra — Build Showcase

## Visão Geral
Aplicação web pública para exibir builds do jogo Legends of Runeterra,
com foco em boa arquitetura e features relevantes para recrutadores.

## Princípios de Desenvolvimento
- Seguir SOLID e DRY em todas as camadas
- Modularizar componentes para reuso e customização
- Desenvolvimento iterativo: funcional primeiro, polimento depois

## Banco de Dados
Tabelas necessárias:
- `reliquias` — itens equipáveis
- `campeoes` — personagens do jogo
- `modificadores` — efeitos/bônus de gameplay
- `builds` — combinação de campeão + 3 relíquias + tutorial
- `mensagens_recrutadores` — formulário de contato para recrutadores

> Detalhar schema no momento da implementação.

## API (ASP.NET Core / C#)
Responsabilidades:
- Ponte entre frontend e banco de dados
- Tratamento e validação de dados
- Segurança (a documentar durante o desenvolvimento)
- Features relevantes para recrutadores (a sinalizar durante o desenvolvimento)

## Frontend (Next.js)
### Estrutura de Páginas
- `/` — Página inicial: informações e avisos sobre o canal
- `/campeoes/[slug]` — Página individual por campeão

### Componentes Principais
- Navbar global com menu de busca por campeão
- Card de build: 3 relíquias com imagens
- Seção de tutorial por build
- Formulário de contato para recrutadores

### Assets
- Pasta dedicada para imagens: campeões, relíquias, modificadores
- Background customizável por tela de campeão

### UX
- Layout responsivo
- Transição animada entre telas de campeões (estilo a definir)

## Status
Escopo inicial definido. Começar pelo básico funcional e iterar.