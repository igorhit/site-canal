# Modelagem — Banco de Dados

## Visão Geral
PostgreSQL 14 rodando na Oracle Cloud VM.
Gerenciado via Entity Framework Core com Migrations — nunca SQL manual.

---

## Tabelas

### `Campeoes`
| Coluna | Tipo | Restrições |
|---|---|---|
| Id | int | PK, autoincrement |
| Nome | varchar(100) | NOT NULL |
| Slug | varchar(100) | NOT NULL, UNIQUE |
| Regiao1 | varchar | nullable |
| Regiao2 | varchar | nullable |
| Estrelas | varchar | nullable — caminho da imagem |
| Bonus | varchar | nullable — caminho da imagem |
| Imagem | varchar | nullable — caminho da imagem |
| Background | varchar | nullable — caminho da imagem |
| Carta1 | varchar | nullable — caminho da imagem |
| Carta2 | varchar | nullable — caminho da imagem |

**Índices:** `Slug` (único)

---

### `Reliquias`
| Coluna | Tipo | Restrições |
|---|---|---|
| Id | int | PK, autoincrement |
| Nome | varchar | NOT NULL |
| Raridade | varchar | nullable |
| Descricao | varchar | nullable |
| Imagem | varchar | nullable — caminho da imagem |

---

### `Modificadores`
Tabela standalone — não possui FK para outras tabelas.
Modificadores são regras aleatórias das aventuras; mencionados em descrições de builds via texto livre.

| Coluna | Tipo | Restrições |
|---|---|---|
| Id | int | PK, autoincrement |
| Nome | varchar | NOT NULL |
| Raridade | varchar | nullable |
| Descricao | varchar | nullable |
| Imagem | varchar | nullable — caminho da imagem |

---

### `TiposBuilds`
Tabela de lookup para categorizar builds.

| Coluna | Tipo | Restrições |
|---|---|---|
| Id | int | PK, autoincrement |
| Descricao | varchar | NOT NULL |

**Exemplos de valores:**
- "3 estrelas raras"
- "3 estrelas épicas"
- "3 estrelas épicas assinatura"
- "6 estrelas raras"
- "6 estrelas épicas"
- "6 estrelas épicas assinatura"

---

### `Builds`
| Coluna | Tipo | Restrições |
|---|---|---|
| Id | int | PK, autoincrement |
| CampeaoId | int | FK → Campeoes(Id), CASCADE DELETE |
| TipoBuildId | int | FK → TiposBuilds(Id), RESTRICT |
| Reliquia1Id | int | FK → Reliquias(Id), RESTRICT |
| Reliquia2Id | int | FK → Reliquias(Id), RESTRICT |
| Reliquia3Id | int | FK → Reliquias(Id), RESTRICT |
| Descricao | varchar | nullable |

**Regras de delete:**
- Deletar campeão → deleta suas builds (CASCADE)
- Deletar relíquia ou tipo → bloqueado se houver build usando (RESTRICT)

---

### `MensagensRecrutadores`
| Coluna | Tipo | Restrições |
|---|---|---|
| Id | int | PK, autoincrement |
| Nome | varchar(150) | NOT NULL |
| Email | varchar(150) | NOT NULL |
| Mensagem | varchar(2000) | NOT NULL |
| CriadoEm | timestamp | NOT NULL, default UTC now |

---

## Diagrama de Relacionamentos

```
Campeoes (1) ──────────── (N) Builds
TiposBuilds (1) ────────── (N) Builds
Reliquias (1) ──────────── (N) Builds.Reliquia1
Reliquias (1) ──────────── (N) Builds.Reliquia2
Reliquias (1) ──────────── (N) Builds.Reliquia3

Modificadores ── standalone (sem FK)
MensagensRecrutadores ── standalone (sem FK)
```

---

## Observações
- O `Slug` de campeão é gerado a partir do nome (ex: `"Miss Fortune"` → `"miss-fortune"`) e usado nas URLs do frontend (`/campeoes/[slug]`)
- Caminhos de imagem são strings relativas à pasta de assets do frontend
- Migrations aplicadas automaticamente ao subir a API (`db.Database.Migrate()` no `Program.cs`)
