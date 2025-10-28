# ⚡ Deploy Rápido - Backend na Vercel

## 🎯 O que foi feito

O backend NestJS está **100% pronto** para deploy automático na Vercel!

**✅ Sem simplificações**  
**✅ Sem alterações de lógica**  
**✅ Tudo funcionando**

## 🚀 Como Fazer Deploy (3 passos)

### 1️⃣ Configure Variáveis de Ambiente

No dashboard da Vercel, adicione:

```bash
# Database
DB_HOST=seu-host
DB_PORT=5432
DB_USER=seu-usuario
DB_PASSWORD=sua-senha
DB_NAME=tokencasa

# URLs
FRONTEND_URL=https://seu-app.vercel.app
NEXT_PUBLIC_XRPL_NETWORK=testnet

# Services (Opcional)
PINATA_API_KEY=...
SENDGRID_API_KEY=...
```

### 2️⃣ Configure Banco de Dados

Escolha uma opção:

**Opção A: Vercel Postgres**
- Vá em Vercel Dashboard → Storage → Create Database
- Use as credenciais geradas

**Opção B: Serviço Externo**
- Railway, Neon, ou Supabase
- Use as credenciais no passo 1

### 3️⃣ Faça Push

```bash
git add .
git commit -m "Deploy backend to Vercel"
git push origin main
```

**Pronto!** A Vercel fará deploy automático. ✅

## 🧪 Testar Localmente

```bash
# Desenvolvimento completo
npm run dev

# Build completo
npm run build
```

## 📚 Documentação Completa

Veja `DEPLOY_BACKEND_VERCEL.md` para detalhes técnicos.

---

**Backend configurado com sucesso!** 🎉

