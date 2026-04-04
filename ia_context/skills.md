# Skills — Referência de Comandos

## Next.js (frontend/)

```bash
# Criar projeto
npx create-next-app@latest frontend --typescript --tailwind --app --no-src-dir

# Rodar local
cd frontend && npm run dev

# Build
npm run build
```

## C# ASP.NET Core (backend/)

```bash
# Rodar local
cd backend && dotnet run

# Publicar para deploy
dotnet publish backend/ -c Release -o ./publish

# Adicionar pacote
dotnet add package <NomeDoPacote>
```

## Entity Framework Core

```bash
# Criar migration
cd backend && dotnet ef migrations add <NomeDaMigration>

# Aplicar migrations localmente
dotnet ef database update

# Reverter última migration
dotnet ef migrations remove
```

## PostgreSQL (na VM)

```bash
# Acessar psql
sudo -u postgres psql

# Conectar ao banco do projeto
sudo -u postgres psql -d portfolio_db

# Listar tabelas
\dt

# Ver estrutura de uma tabela
\d "NomeDaTabela"
```

## Deploy (backend para VM)

```bash
# Na raiz do projeto (site_canal/)
dotnet publish backend/ -c Release -o ./publish
scp -i "C:/Users/HIT/.ssh/oracle" -r ./publish/. ubuntu@137.131.189.217:~/api/
ssh -i "C:/Users/HIT/.ssh/oracle" ubuntu@137.131.189.217 "sudo systemctl restart portfolio-api"
```

## Verificar logs da API

```bash
ssh -i "C:/Users/HIT/.ssh/oracle" ubuntu@137.131.189.217 "sudo journalctl -u portfolio-api -n 50 --no-pager"
```

## Testar API na VM

```bash
# Listar campeões
ssh -i "C:/Users/HIT/.ssh/oracle" ubuntu@137.131.189.217 "curl -s http://localhost/api/campeoes"

# Buscar campeão por slug
ssh -i "C:/Users/HIT/.ssh/oracle" ubuntu@137.131.189.217 "curl -s http://localhost/api/campeoes/jinx"
```

## SSH na VM

```bash
ssh -i "C:/Users/HIT/.ssh/oracle" ubuntu@137.131.189.217
```

## Git

```bash
git init
git add .
git commit -m "mensagem"
git remote add origin <url>
git push -u origin main
```
