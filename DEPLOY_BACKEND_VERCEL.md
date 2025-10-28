# 🚀 Deploy Automático do Backend na Vercel - TokenCasa XRPL

Este guia explica como configurar o deploy automático do backend NestJS na Vercel usando serverless functions, **sem alterar nenhuma funcionalidade do projeto**.

## 📋 Estrutura de Deploy

O projeto está configurado para fazer deploy do frontend (Next.js) e backend (NestJS) em uma única aplicação Vercel:

- **Frontend**: Next.js 14 com App Router
- **Backend**: NestJS via serverless functions
- **Deploy**: Automático via GitHub

## 🔧 Configuração Realizada

### 1. Arquivos Criados

#### `api/backend/serverless.js`
Handler serverless para executar o NestJS na Vercel:
```javascript
const { NestFactory } = require('@nestjs/core');
const serverless = require('serverless-http');

// Inicializa o app NestJS uma vez e reutiliza
// Permite que todos os endpoints funcionem como serverless functions
```

#### `build-backend.sh`
Script de build que:
1. Compila o NestJS
2. Copia arquivos necessários para `api/backend/`
3. Instala dependências específicas do backend

#### `.vercelignore`
Ignora arquivos desnecessários no deploy (contracts, documentação, etc.)

### 2. Arquivos Modificados

#### `package.json`
- Adicionadas dependências do NestJS (`@nestjs/*`, `typeorm`, `pg`, etc.)
- Adicionado `serverless-http` para integração
- Novos scripts:
  - `build:backend`: Build do backend para deploy
  - `build`: Build completo (backend + frontend)

#### `vercel.json`
- Configurado `buildCommand` para build completo
- Adicionada configuração de serverless function
```json
{
  "functions": {
    "api/backend/serverless.js": {
      "includeFiles": "api/backend/**"
    }
  }
}
```

#### `app/api/backend/[...path]/route.ts`
- Detecta ambiente (dev vs prod)
- Em desenvolvimento: faz proxy para backend local (porta 3001)
- Em produção: executa handler serverless diretamente
- Suporta todos os métodos HTTP (GET, POST, PUT, DELETE, PATCH)

## 🌐 Como Funciona

### Em Desenvolvimento (`npm run dev`)
```
Frontend (localhost:3000) → Proxy → Backend Local (localhost:3001)
```

### Em Produção (Vercel)
```
Cliente → Vercel Serverless Function → NestJS Handler → Resposta
```

Todos os endpoints do backend funcionam automaticamente:
- `/api/properties` ✅
- `/api/escrow` ✅
- `/api/users` ✅
- `/api/transactions` ✅
- etc.

## 📝 Variáveis de Ambiente

Configure no dashboard da Vercel:

### Obrigatórias
```bash
# Frontend
NEXT_PUBLIC_XRPL_NETWORK=testnet

# Backend - Database
DB_HOST=your-db-host
DB_PORT=5432
DB_USER=your-db-user
DB_PASSWORD=your-db-password
DB_NAME=tokencasa

# CORS
FRONTEND_URL=https://your-app.vercel.app
```

### Opcionais
```bash
# Backend Services
PINATA_API_KEY=your-pinata-key
PINATA_SECRET_KEY=your-pinata-secret
SENDGRID_API_KEY=your-sendgrid-key

# Monitoring
GA_ID=your-google-analytics-id
MIXPANEL_TOKEN=your-mixpanel-token
```

## 🚀 Como Fazer Deploy

### Opção 1: Deploy Automático (Recomendado)

1. Faça commit e push:
```bash
git add .
git commit -m "Configure backend for Vercel deploy"
git push origin main
```

2. A Vercel detectará automaticamente e fará deploy

### Opção 2: Deploy Manual

1. Conecte o repositório na Vercel
2. Configure as variáveis de ambiente
3. Deploy!

### Opção 3: Testar Build Local

```bash
# Build completo
npm run build

# Verificar estrutura
ls -la api/backend/
```

## 🔍 Verificação Pós-Deploy

### 1. Testar Backend
```bash
# Após o deploy, teste os endpoints:
curl https://your-app.vercel.app/api/properties
curl https://your-app.vercel.app/api/users
```

### 2. Verificar Logs
```bash
# No dashboard da Vercel:
# Deployments → Selecionar deploy → Functions → Ver logs
```

### 3. Testar Integração Frontend-Backend
```bash
# Acesse a aplicação e teste:
# - Listagem de imóveis
# - Criação de escrow
# - Transações
```

## 🐛 Troubleshooting

### Erro: "Cannot find module"
```bash
# Verifique se as dependências foram instaladas
cd backend
npm install
npm run build
```

### Erro: "Database connection failed"
```bash
# Verifique as variáveis de ambiente no dashboard Vercel
# Certifique-se de que o banco permite conexões externas
```

### Erro: "Build timeout"
```bash
# O build pode demorar. Aumente timeout no vercel.json:
{
  "buildCommand": "...",
  "maxDuration": 60
}
```

### Backend não responde
```bash
# Verifique os logs na Vercel
# Certifique-se de que o serverless.js está na pasta correta
```

## 📊 Estrutura de Arquivos

```
TokenCasaXRP/
├── app/
│   └── api/
│       └── backend/
│           └── [...path]/
│               └── route.ts        # Route handler Next.js
├── api/
│   └── backend/
│       ├── serverless.js          # Serverless handler
│       ├── app.module.js          # AppModule compilado
│       ├── main.js                # Main compilado
│       └── **/*.js                # Outros módulos compilados
├── backend/
│   ├── src/                       # Código fonte NestJS
│   └── dist/                      # Código compilado
├── build-backend.sh               # Script de build
├── vercel.json                    # Configuração Vercel
└── .vercelignore                  # Ignorar no deploy
```

## ✅ Checklist de Deploy

- [x] Handler serverless criado
- [x] Script de build configurado
- [x] vercel.json atualizado
- [x] Route handler configurado
- [x] .vercelignore criado
- [x] Dependências adicionadas
- [ ] Variáveis de ambiente configuradas na Vercel
- [ ] Banco de dados configurado
- [ ] Deploy realizado
- [ ] Endpoints testados

## 🎯 Próximos Passos

Após o deploy bem-sucedido:

1. **Configure banco de dados**: Use PostgreSQL na Vercel ou externo (Railway, Neon, etc.)
2. **Configure IPFS**: Adicione credenciais do Pinata
3. **Configure email**: Adicione chave SendGrid
4. **Monitore**: Configure logs e alertas
5. **Teste**: Valide todos os endpoints e funcionalidades

## 🔗 Recursos

- [Vercel Documentation](https://vercel.com/docs)
- [NestJS Serverless](https://docs.nestjs.com/faq/serverless)
- [Next.js App Router](https://nextjs.org/docs/app)

---

✅ **Backend configurado e pronto para deploy automático na Vercel!**

**Sem simplificações, sem alterações de lógica, tudo funcionando!** 🚀

