# 🚀 Deploy Automático na Vercel - TokenCasa XRPL Testnet

## Configuração de Deploy Automático

Este projeto está configurado para fazer deploy automático na Vercel sempre que você fizer push para o branch main.

### 📋 Pré-requisitos

1. ✅ Conta Vercel conectada ao GitHub
2. ✅ Repositório conectado na Vercel
3. ✅ Variáveis de ambiente configuradas

### 🔧 Variáveis de Ambiente

Configure as seguintes variáveis de ambiente no dashboard da Vercel:

#### Obrigatórias:
- `NEXT_PUBLIC_XRPL_NETWORK` = `testnet`
- `NODE_ENV` = `production`

#### Opcionais (para funcionalidades completas):
- `NEXT_PUBLIC_BACKEND_URL` = URL do backend (se deployado separadamente)
- `NEXT_PUBLIC_GA_ID` = ID do Google Analytics (opcional)
- `NEXT_PUBLIC_MIXPANEL_TOKEN` = Token do Mixpanel (opcional)

### 🌐 Configuração de Rede

O frontend está configurado para usar **XRPL Testnet** por padrão:

- **Network**: Testnet
- **Endpoint**: `wss://s.altnet.rippletest.net:51233`
- **Contratos**: Deployados e funcionais na testnet

### 📝 Arquivos de Configuração

#### `vercel.json`
```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev:frontend",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["gru1"],
  "env": {
    "NEXT_PUBLIC_XRPL_NETWORK": "testnet"
  }
}
```

#### `.vercelignore`
Ignora o backend, contratos e arquivos desnecessários no deploy.

### 🎯 Como Fazer Deploy

#### Opção 1: Deploy Automático (Recomendado)

1. Faça push para o branch `main`:
```bash
git add .
git commit -m "Deploy para testnet"
git push origin main
```

2. A Vercel detectará automaticamente o push e fará deploy
3. Acesse o dashboard da Vercel para acompanhar o progresso

#### Opção 2: Deploy Manual

1. Acesse https://vercel.com
2. Vá em "Projects" → Seu projeto
3. Clique em "Deployments" → "Redeploy"

### ✅ Checklist de Deploy

- [x] Variáveis de ambiente configuradas
- [x] Next.config.js configurado corretamente
- [x] Verificar build local: `npm run build`
- [x] Testar localmente: `npm run dev:frontend`
- [x] Verificar se não há erros de lint
- [x] Commit e push para trigger automático

### 🔍 Verificação Pós-Deploy

Após o deploy, verifique:

1. **URL de Produção**: https://seu-projeto.vercel.app
2. **Wallet Connection**: Teste com Crossmark/GemWallet
3. **API Routes**: Teste `/api/properties`, `/api/escrow`
4. **XRPL Connection**: Verificar conexão com testnet

### 🐛 Troubleshooting

#### Erro de Build

```bash
# Testar build local
npm run build
```

#### Erro de Variável de Ambiente

Verificar no dashboard da Vercel:
1. Settings → Environment Variables
2. Garantir que `NEXT_PUBLIC_XRPL_NETWORK` está definida

#### Erro de Conexão XRPL

Verificar no console do navegador se está conectando ao endpoint correto:
- Testnet: `wss://s.altnet.rippletest.net:51233`
- Mainnet: `wss://xrplcluster.com`

### 📊 Status de Deploy

**Último Deploy**: Em progresso  
**Branch**: main  
**Network**: testnet  
**Status**: ✅ Configurado

### 🔗 Links

- **Dashboard Vercel**: https://vercel.com/dashboard
- **Repo GitHub**: [Seu repositório]
- **App Deployado**: https://seu-projeto.vercel.app

---

✅ **Projeto configurado e pronto para deploy automático!**

