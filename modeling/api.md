# Modelagem — API

## Visão Geral
ASP.NET Core 8 Web API seguindo arquitetura em camadas:
```
Controllers → Services → Repositories → DbContext (EF Core) → PostgreSQL
```
Roda em `http://localhost:5000` na VM, exposta externamente via Nginx em `http://137.131.189.217/api/`.

---

## Arquitetura em Camadas

| Camada | Responsabilidade |
|---|---|
| **Controllers** | Receber requisições HTTP, retornar respostas |
| **Services** | Regras de negócio, montagem dos DTOs |
| **Repositories** | Queries ao banco via EF Core |
| **Models** | Entidades mapeadas para o banco |
| **DTOs** | Contratos de entrada/saída da API |

---

## Endpoints

### Campeões

#### `GET /api/campeoes`
Retorna lista resumida de todos os campeões (para navbar/busca).

**Response `200`:**
```json
[
  {
    "id": 1,
    "nome": "Jinx",
    "slug": "jinx",
    "imagem": "/assets/campeoes/jinx.png"
  }
]
```

---

#### `GET /api/campeoes/{slug}`
Retorna dados completos do campeão com todas as suas builds e relíquias.

**Response `200`:**
```json
{
  "id": 1,
  "nome": "Jinx",
  "slug": "jinx",
  "regiao1": "Zaun",
  "regiao2": null,
  "estrelas": "/assets/estrelas/3-epicas.png",
  "bonus": "/assets/bonus/jinx-bonus.png",
  "imagem": "/assets/campeoes/jinx.png",
  "background": "/assets/backgrounds/jinx-bg.jpg",
  "carta1": "/assets/cartas/jinx-carta1.png",
  "carta2": "/assets/cartas/jinx-carta2.png",
  "builds": [
    {
      "id": 1,
      "tipoBuild": "3 estrelas épicas",
      "descricao": "Build focada em dano rápido...",
      "reliquia1": {
        "id": 2,
        "nome": "Espada do Rei Arruinado",
        "raridade": "Épica",
        "descricao": "...",
        "imagem": "/assets/reliquias/espada-rei-arruinado.png"
      },
      "reliquia2": { ... },
      "reliquia3": { ... }
    }
  ]
}
```

**Response `404`:** campeão não encontrado.

---

### Contato

#### `POST /api/contato`
Salva mensagem de recrutador no banco.

**Request body:**
```json
{
  "nome": "João Silva",
  "email": "joao@empresa.com",
  "mensagem": "Olá, vi seu portfólio..."
}
```

**Validações:**
- `nome`: obrigatório, máx. 150 caracteres
- `email`: obrigatório, formato válido, máx. 150 caracteres
- `mensagem`: obrigatória, máx. 2000 caracteres

**Response `200`:**
```json
{ "mensagem": "Mensagem enviada com sucesso!" }
```

**Response `400`:** body inválido (validação automática do ASP.NET).

---

## DTOs

### Saída

| DTO | Usado em |
|---|---|
| `CampeaoResumoDto` | `GET /api/campeoes` |
| `CampeaoDetalheDto` | `GET /api/campeoes/{slug}` |
| `BuildDto` | dentro de `CampeaoDetalheDto` |
| `ReliquiaDto` | dentro de `BuildDto` |

### Entrada

| DTO | Usado em |
|---|---|
| `ContatoDto` | `POST /api/contato` |

---

## CORS
Permite requisições de:
- `http://localhost:3000` (desenvolvimento)
- `https://localhost:3000` (desenvolvimento HTTPS)
- URL da Vercel (configurada em `appsettings.json` → `Cors:VercelUrl`)

**Nota:** o frontend Next.js usa Server Components para buscar dados — as chamadas partem do servidor da Vercel, não do browser. Isso evita o problema de mixed content (HTTPS → HTTP).

---

## Configuração por Ambiente

| Configuração | Development | Production |
|---|---|---|
| Connection string | `appsettings.Development.json` | Variável de ambiente no systemd |
| Swagger UI | Ativo | Desativado |
| Migrations | Manual (`dotnet ef database update`) | Automática ao iniciar |

---

## Próximos Endpoints (planejados)
- `GET /api/reliquias` — listagem para futura página de relíquias
- `GET /api/modificadores` — listagem de modificadores
- `GET /api/tiposbuilds` — listagem dos tipos de build
