# 🚀 Deploy Automático do Backend TokenCasa na Railway

## Configuração de Deploy Automático

Este backend NestJS está configurado para deploy automático na Railway.

### 📋 Pré-requisitos

1. ✅ Conta Railway conectada ao GitHub
2. ✅ Repositório conectado na Railway
3. ✅ Variáveis de ambiente configuradas

### 🔧 Variáveis de Ambiente Obrigatórias

Configure as seguintes variáveis de ambiente no dashboard da Railway:

#### Backend:
- `PORT` = `3001` (configurado automaticamente pela Railway)
- `NODE_ENV` = `production`

#### Database (PostgreSQL):
- `DB_HOST` = Host do PostgreSQL (fornecido pela Railway)
- `DB_PORT` = `5432`
- `DB_USER` = Usuário do PostgreSQL
- `DB_PASSWORD` = Senha do PostgreSQL
- `DB_NAME` = `tokencasa`

#### XRPL (Testnet):
- `XRPL_NETWORK` = `testnet`
- `XRPL_NODE` = `wss://s.altnet.rippletest.net:51233`

#### Integrações (Opcional):
- `PINATA_API_KEY` = API Key do Pinata (IPFS)
- `PINATA_SECRET_KEY` = Secret Key do Pinata
- `SENDGRID_API_KEY` = API Key do SendGrid (Email)
- `SENDGRID_FROM` = Email remetente
- `FRONTEND_URL` = URL do frontend (https://tokencasaxrp.vercel.app)

### 🎯 Como Fazer Deploy

#### Opção 1: Deploy Automático (Recomendado)

1. Acesse: https://railway.app
2. Clique em "New Project"
3. Selecione "Deploy from GitHub repo"
4. Escolha seu repositório: `Jistriane/TOKENCASAXRP`
5. Configure o Root Directory como: `backend`
6. Adicione PostgreSQL Service:
   - Clique em "New"
   - Selecione "PostgreSQL"
   - Variáveis de conexão serão automáticas

#### Opção 2: Deploy Manual

```bash
# Instalar Railway CLI
npm i -g @railway/cli

# Login
railway login

# Link ao projeto
railway init

# Deploy
railway up
```

### 📊 Estrutura do Backend

**12 Módulos Completos:**
1. ✅ Properties - CRUD de imóveis
2. ✅ Users - KYC + Auth
3. ✅ Transactions - Histórico
4. ✅ Escrow - Distribuição de aluguel
5. ✅ XRPL - Blockchain
6. ✅ IPFS - Storage
7. ✅ Notifications - Email
8. ✅ Oracles - Chainlink
9. ✅ Compliance - CVM
10. ✅ Auth - JWT
11. ✅ Push - Notificações push
12. ✅ Rental - API de aluguel

### 🔗 Endpoints da API

**Properties:**
- `GET /api/properties` - Lista imóveis
- `GET /api/properties/:id` - Detalhes do imóvel
- `POST /api/properties` - Cria novo imóvel
- `POST /api/properties/:id/tokenize` - Tokeniza imóvel

**Users:**
- `GET /api/users` - Lista usuários
- `POST /api/users/kyc` - Verifica KYC

**Transactions:**
- `GET /api/transactions` - Lista transações
- `POST /api/transactions` - Cria transação

**Auth:**
- `POST /api/auth/login` - Login
- `POST /api/auth/register` - Registro
- `POST /api/auth/refresh` - Refresh token

**Escrow:**
- `POST /api/escrow/distribute` - Distribui aluguel
- `GET /api/escrow/:id` - Status do escrow

**Rental:**
- `POST /api/rental/webhook` - Webhook de pagamento
- `GET /api/rental/history/:propertyId` - Histórico de aluguel
- `POST /api/rental/distribute` - Distribui aluguel

### ✅ Checklist de Deploy

- [x] Backend NestJS configurado
- [x] PostgreSQL adicionado
- [x] Variáveis de ambiente configuradas
- [x] CORS configurado
- [x] Build command configurado
- [x] Start command configurado

### 🔍 Verificação Pós-Deploy

Após o deploy, verifique:

1. **URL da API**: https://seu-projeto.railway.app/api
2. **Health Check**: https://seu-projeto.railway.app/api
3. **Database**: Conexão PostgreSQL funcionando
4. **XRPL**: Conexão com testnet estabelecida

### 🐛 Troubleshooting

#### Erro de Build
```bash
# Verificar logs
railway logs
```

#### Erro de Conexão PostgreSQL
Verificar variáveis de ambiente no dashboard da Railway.

#### Erro de CORS
Verificar variável `FRONTEND_URL` aponta para a URL correta do frontend.

### 📊 Status de Deploy

**Stack**: NestJS + PostgreSQL  
**Network**: XRPL Testnet  
**Database**: PostgreSQL 15  
**Status**: ✅ Configurado e pronto para deploy

---

✅ **Backend configurado e pronto para deploy automático!**

**Instrução**: Adicione o PostgreSQL como serviço no Railway e configure as variáveis de ambiente.

