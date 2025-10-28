# 🚀 Deploy na Vercel - Configuração Final

## ✅ Status Atual

- **Frontend**: Next.js pronto para deploy na Vercel ✅
- **Backend**: Configurado para rodar em servidor externo

## 🎯 Abordagem Recomendada

Para ter backend e frontend funcionando perfeitamente:

### Opção 1: Backend em Serviço Externo (Mais Simples)

**Frontend**: Vercel ✅  
**Backend**: Railway, Render, ou similar

**Configuração:**
1. Deploy do backend em um serviço como Railway
2. Configure a variável de ambiente na Vercel:
   ```
   NEXT_PUBLIC_BACKEND_URL=https://seu-backend.railway.app
   ```
3. O frontend fará proxy automático para o backend

### Opção 2: Backend também na Vercel (Mais Complexo)

Requisições de configuração adicional. O NestJS precisa ser adaptado para funcionar como serverless function na Vercel.

## 📝 Configuração Atual

O projeto está configurado para **Opção 1**.

**Frontend (Vercel):**
- URL: Seu app na Vercel
- Fazer proxy para: `NEXT_PUBLIC_BACKEND_URL`

**Backend (Serviço externo recomendado):**
- Railway: https://railway.app
- Render: https://render.com
- Fly.io: https://fly.io

## 🔧 Variáveis de Ambiente Vercel

```bash
# Obrigatórias
NEXT_PUBLIC_XRPL_NETWORK=testnet
NEXT_PUBLIC_BACKEND_URL=https://seu-backend.railway.app

# Opcionais
NEXT_PUBLIC_GA_ID=seu-google-analytics-id
NEXT_PUBLIC_MIXPANEL_TOKEN=seu-mixpanel-token
```

## 🚀 Deploy do Backend em Railway

### 1. Crie conta na Railway
```bash
https://railway.app/new
```

### 2. Conecte o repositório
- Selecione "Deploy from GitHub repo"
- Escolha seu repositório
- Configure o diretório: `backend`

### 3. Configure variáveis
```bash
DB_HOST=...
DB_PORT=5432
DB_USER=...
DB_PASSWORD=...
DB_NAME=tokencasa
FRONTEND_URL=https://seu-app.vercel.app
```

### 4. Configure o banco de dados
Railway oferece PostgreSQL gratuito. Use as credenciais geradas.

## ✅ Checklist

- [ ] Frontend deployado na Vercel
- [ ] Backend deployado em Railway/Render
- [ ] Variáveis de ambiente configuradas
- [ ] Banco de dados PostgreSQL configurado
- [ ] URL do backend configurada na Vercel
- [ ] Testar endpoints da API

---

**Frontend pronto para deploy automático na Vercel!** 🎉

