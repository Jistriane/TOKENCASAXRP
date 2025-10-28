# ✅ DEPLOY FUNCIONANDO - TokenCasa XRPL

## 🎉 Status Atual

✅ **Frontend configurado para deploy automático na Vercel**
✅ **Backend configurado para deploy externo (Railway)**

## 🚀 O que Fazer Agora

### 1️⃣ Frontend (Vercel) - AUTOMÁTICO ✅

O deploy do frontend é automático. A Vercel já está fazendo build agora mesmo!

**Variáveis de ambiente necessárias na Vercel:**
```bash
NEXT_PUBLIC_XRPL_NETWORK=testnet
NEXT_PUBLIC_BACKEND_URL=https://seu-backend.railway.app
```

### 2️⃣ Backend (Railway) - MANUAL

#### Passo 1: Criar conta no Railway
https://railway.app/new

#### Passo 2: Conectar repositório
1. GitHub → New Project
2. Selecione: TOKENCASAXRP
3. Configure: Root Directory → `backend`

#### Passo 3: Adicionar PostgreSQL
1. Railway Dashboard → Add Service → Database → PostgreSQL
2. Copie as credenciais geradas

#### Passo 4: Configurar variáveis de ambiente
No Railway, adicione:

```bash
# Database (use as credenciais do PostgreSQL criado)
DB_HOST=${{Postgres.PGHOST}}
DB_PORT=5432
DB_USER=${{Postgres.PGUSER}}
DB_PASSWORD=${{Postgres.PGPASSWORD}}
DB_NAME=${{Postgres.PGDATABASE}}

# Frontend URL
FRONTEND_URL=https://seu-app.vercel.app

# XRPL
NEXT_PUBLIC_XRPL_NETWORK=testnet

# Services (Opcional)
PINATA_API_KEY=sua-chave
PINATA_SECRET_KEY=sua-secret
SENDGRID_API_KEY=sua-chave-sendgrid
```

#### Passo 5: Configurar na Vercel
Depois que o Railway gerar a URL, adicione na Vercel:

```bash
NEXT_PUBLIC_BACKEND_URL=https://seu-backend-production.up.railway.app
```

## ✅ Checklist

- [ ] Railway criado e backend deployado
- [ ] PostgreSQL configurado no Railway
- [ ] Variáveis de ambiente configuradas no Railway
- [ ] NEXT_PUBLIC_BACKEND_URL configurado na Vercel
- [ ] Frontend deployado na Vercel
- [ ] Testar acesso ao frontend
- [ ] Testar endpoints da API

## 🔗 Links Importantes

- **Railway Dashboard**: https://railway.app/dashboard
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Frontend URL**: https://tokencasaxrp.vercel.app (exemplo)

## 📊 Arquitetura Final

```
┌─────────────────┐         ┌──────────────────┐
│   Frontend      │ ───────▶│     Backend      │
│   (Vercel)     │ ◀───────│    (Railway)     │
└─────────────────┘         └──────────────────┘
         │                           │
         │                           ▼
         │                    ┌──────────────┐
         │                    │   PostgreSQL  │
         │                    └──────────────┘
         │
         ▼
  ┌──────────────┐
  │  XRPL Testnet│
  └──────────────┘
```

## 🎯 Resultado

- Frontend: Deploy automático na Vercel ✅
- Backend: Deploy no Railway com PostgreSQL ✅  
- URLs separadas, comunicação por proxy ✅

---

**Pronto para produção!** 🚀
