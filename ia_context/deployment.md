# Deployment

## Estado Atual da Infraestrutura

- **VM:** Oracle Cloud, Ubuntu 22.04, IP `137.131.189.217`
- **SSH key:** `C:/Users/HIT/.ssh/oracle`
- **Serviço API:** `portfolio-api` (systemd) — rodando na porta 5000 ✓
- **Nginx:** ativo, proxy `/api/` → `localhost:5000` ✓
- **PostgreSQL:** ativo, banco `portfolio_db`, usuário `portfolio_user` ✓
- **Frontend:** pendente — Next.js ainda não criado

---

## Frontend — Vercel

1. Push para `main` no GitHub
2. Vercel detecta e faz build automático
3. Variáveis de ambiente a configurar no painel da Vercel:
   - `NEXT_PUBLIC_API_URL=http://137.131.189.217/api`

---

## Backend — Deploy de atualização

```bash
# Na raiz do projeto (site_canal/)
dotnet publish backend/ -c Release -o ./publish
scp -i "C:/Users/HIT/.ssh/oracle" -r ./publish/. ubuntu@137.131.189.217:~/api/
ssh -i "C:/Users/HIT/.ssh/oracle" ubuntu@137.131.189.217 "sudo systemctl restart portfolio-api"
```

Migrations são aplicadas automaticamente ao reiniciar (`db.Database.Migrate()` no `Program.cs`).

---

## Nginx

Configuração em `/etc/nginx/sites-available/portfolio`:

```nginx
server {
    listen 80;
    server_name _;

    location /api/ {
        proxy_pass http://localhost:5000/api/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

Recarregar após mudanças:

```bash
ssh -i "C:/Users/HIT/.ssh/oracle" ubuntu@137.131.189.217 "sudo nginx -t && sudo systemctl reload nginx"
```

---

## Variáveis de Ambiente na VM

Definidas em `/etc/systemd/system/portfolio-api.service`:

```ini
Environment=ASPNETCORE_ENVIRONMENT=Production
Environment=ASPNETCORE_URLS=http://localhost:5000
Environment=ConnectionStrings__DefaultConnection=Host=localhost;Database=portfolio_db;Username=portfolio_user;Password=P0rtf0lio@2026
```

Após alterar o service:

```bash
ssh -i "C:/Users/HIT/.ssh/oracle" ubuntu@137.131.189.217 "sudo systemctl daemon-reload && sudo systemctl restart portfolio-api"
```

---

## Portas Abertas na Oracle Cloud

| Porta | Protocolo | Uso |
| --- | --- | --- |
| 22 | TCP | SSH |
| 80 | TCP | HTTP (Nginx) |
| 443 | TCP | HTTPS (futuro) |

> Porta 5432 (PostgreSQL) **não exposta** — acesso local apenas.
