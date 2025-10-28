# 🚀 Guia Completo de Deploy - TokenCasa XRPL

## ✅ Status do Deploy

### Frontend - Vercel (✅ Deployado)

**URLs:**
- 🌐 Produção: https://tokencasaxrp.vercel.app
- 🚀 Preview: https://tokencasaxrp-git-main-jistrianedroid-3423s-projects.vercel.app

**Configuração:**
- Framework: Next.js 14
- Região: São Paulo (gru1)
- Network: XRPL Testnet
- Build: Otimizado para produção

---

### Backend - Opções de Deploy

O backend NestJS precisa de duas opções para deploy:

#### Opção 1: API Routes do Next.js (✅ Implementado)

O frontend já inclui API routes serverless que funcionam na Vercel:

**Estrutura:**
- `app/api/properties/route.ts` - API de imóveis (mock)
- `app/api/escrow/route.ts` - API de escrow (mock)
- `app/api/push/subscribe/route.ts` - Push notifications
- `app/api/push/unsubscribe/route.ts` - Push notifications

**Vantagens:**
- ✅ Sem custos adicionais
- ✅ Fácil de configurar
- ✅ Serverless automático
- ✅ Semplificação: ⚠️ Apenas endpoints mock

**Desvantagens:**
- ⚠️ PostgreSQL não disponível
- ⚠️ Funcionalidades limitadas (mocks)

#### Opção 2: Railway (Recomendado para Backend Completo)

Para o backend NestJS completo com PostgreSQL:

**Configuração:**
- Deploy automático via GitHub
- PostgreSQL incluído
- 12 módulos completos
- Todas as funcionalidades

**Vantagens:**
- ✅ Backend completo sem simplificar
- ✅ PostgreSQL incluído
- ✅ Todas as integrações funcionando
- ✅ Deploy automático

**Passos:**

1. Acesse: https://railway.app
2. Crie nova conta ou faça login
3. Clique em "New Project"
4. Selecione "Deploy from GitHub repo"
5. Escolha: `Jistriane/TOKENCASAXRP`
6. Configure:
   - **Root Directory**: `backend`
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`

7. Adicione PostgreSQL:
   - Clique em "New"
   - Selecione "PostgreSQL"
   - As variáveis serão configuradas automaticamente

8. Configure variáveis de ambiente:
   - `NEXT_PUBLIC_XRPL_NETWORK` = `testnet`
   - `DB_HOST` = (automático do Railway)
   - `DB_PORT` = `5432`
   - `DB_NAME` = `tokencasa`
   - E outras variáveis necessárias

#### Opção 3: Render (Alternativa)

Similar ao Railway:

1. Acesse: https://render.com
2. Conecte seu GitHub
3. Selecione o repositório
4. Configure:
   - **Build Command**: `cd backend && npm run build`
   - **Start Command**: `cd backend && npm start`
5. Adicione PostgreSQL service
6. Configure variáveis de ambiente

---

## 🔧 Configuração de Variáveis de Ambiente

### Frontend (Vercel)

No dashboard da Vercel → Settings → Environment Variables:

```
NEXT_PUBLIC_XRPL_NETWORK=testnet
NEXT_PUBLIC_BACKEND_URL=https://seu-backend.railway.app
NODE_ENV=production
```

### Backend (Railway)

No dashboard da Railway → Variables:

```
# Database (fornecido automaticamente pelo Railway)
DB_HOST=${{Postgres.PGHOST}}
DB_PORT=${{Postgres.PGPORT}}
DB_USER=${{Postgres.PGUSER}}
DB_PASSWORD=${{Postgres.PGPASSWORD}}
DB_NAME=${{Postgres.PGDATABASE}}

# XRPL
XRPL_NETWORK=testnet
XRPL_NODE=wss://s.altnet.rippletest.net:51233

# Frontend
FRONTEND_URL=https://tokencasaxrp.vercel.app

# Integrações (Opcional)
PINATA_API_KEY=sua_api_key
PINATA_SECRET_KEY=seu_secret
SENDGRID_API_KEY=sua_api_key
```

---

## 📊 Estrutura de Deploy

```
┌─────────────────────────────────────────┐
│         Frontend (Vercel)               │
│      https://tokencasaxrp.vercel.app   │
│                                          │
│  ✅ Next.js 14                          │
│  ✅ API Routes Serverless               │
│  ✅ Build otimizado                     │
│  ✅ Network: XRPL Testnet               │
└───────────────┬─────────────────────────┘
                │
                ├──► Opção A: API Routes (Vercel)
                │    └─► Mock endpoints
                │
                └──► Opção B: Backend (Railway)
                     └─► Backend NestJS completo
```

---

## 🚀 Deploy Automático

### Frontend

✅ Deploy automático configurado via GitHub  
✅ Push para `main` → Deploy automático na Vercel

### Backend (Railway)

Após conectar o repositório:

✅ Push para `main` → Deploy automático na Railway  
✅ PostgreSQL inclui migrações automáticas  
✅ Build otimizado para produção

---

## 🔍 Verificação Pós-Deploy

### Frontend

Acesse: https://tokencasaxrp.vercel.app

**Verificar:**
- ✅ Página carrega corretamente
- ✅ Logo aparece
- ✅ Conexão com wallet funciona
- ✅ API routes respondem

### Backend (Railway)

Acesse: https://seu-projeto.railway.app/api

**Verificar:**
- ✅ Health check: `/api`
- ✅ Properties: `/api/properties`
- ✅ Database conectado
- ✅ XRPL conectado

---

## 📝 Arquivos de Configuração

### Frontend
- ✅ `vercel.json` - Configuração Vercel
- ✅ `.vercelignore` - Arquivos ignorados
- ✅ `app/api/backend/[...path]/route.ts` - Proxy para backend

### Backend
- ✅ `backend/railway.json` - Configuração Railway
- ✅ `backend/railway.toml` - Configuração Railway
- ✅ `backend/Procfile` - Comando de start
- ✅ `backend/DEPLOY_RAILWAY.md` - Guia completo

---

## 🎯 Checklist de Deploy

### Frontend ✅

- [x] vercel.json configurado
- [x] .vercelignore criado
- [x] API routes serverless
- [x] Build sem erros
- [x] Deploy automático
- [x] URLs de produção

### Backend ⏳

- [x] railway.json configurado
- [x] railway.toml criado
- [x] Procfile criado
- [x] Documentação completa
- [ ] Conectar Railway
- [ ] Configurar PostgreSQL
- [ ] Configurar variáveis de ambiente
- [ ] Deploy inicial

---

## 📞 Suporte

Para mais informações:
- Frontend: Ver `vercel.json` e `DEPLOY_VERCEL.md`
- Backend: Ver `backend/DEPLOY_RAILWAY.md`
- Documentação completa: `README.md`

---

✅ **Frontend: PRONTO E DEPLOYADO**  
⏳ **Backend: CONFIGURADO, AGUARDANDO DEPLOY**

