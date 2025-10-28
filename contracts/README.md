# 📋 TokenCasa - Contratos XRPL

## 🎯 Visão Geral

Os contratos do TokenCasa utilizam as funcionalidades **nativas** do XRPL para implementar tokenização de imóveis, trading descentralizado e distribuição automática de aluguéis.

---

## 📦 Contratos Disponíveis

### 1. MPTContract - Multi-Purpose Tokens
Gerencia a criação e transferência de tokens de imóveis.

### 2. EscrowContract - Distribuição de Aluguel
Gerencia escrows time-locked para distribuição proporcional de aluguéis.

### 3. CredentialsContract - KYC/AML
Gerencia credentials para verificação de investidores.

### 4. DEXContract - Trading Descentralizado
Gerencia ordens de compra/venda no DEX nativo do XRPL.

---

## 🚀 Instalação

```bash
npm install
```

### Dependências

```json
{
  "xrpl": "^4.4.2"
}
```

---

## 💻 Uso Básico

### Exemplo 1: Criar um MPT

```typescript
import { MPTContract } from './contracts/xrpl';
import { Wallet } from 'xrpl';

const mpt = new MPTContract('testnet');
const wallet = Wallet.fromSecret('s...'); // Sua wallet

const mptConfig = {
  propertyId: 'apt-001',
  propertyName: 'Apartamento Copacabana',
  totalSupply: 1000000,
  ownerAddress: wallet.address,
  ipfsMetadataHash: 'QmHash...',
  credentialRequirement: 'BR-Investor-Verified'
};

const token = await mpt.createMPT(mptConfig, wallet);
console.log('MPT criado:', token.id);
```

### Exemplo 2: Criar Escrow para Aluguel

```typescript
import { EscrowContract } from './contracts/xrpl';

const escrow = new EscrowContract('testnet');

const escrowConfig = {
  propertyId: 'apt-001',
  propertyName: 'Apartamento Copacabana',
  totalRent: 6000, // R$ 6.000
  totalTokens: 1000000,
  releaseDate: new Date('2025-02-05'), // Dia 5 do próximo mês
};

const escrowInfo = await escrow.createEscrow(escrowConfig, wallet);
console.log('Escrow criado:', escrowInfo.id);
```

### Exemplo 3: Emitir Credential

```typescript
import { CredentialsContract } from './contracts/xrpl';

const credentials = new CredentialsContract('testnet');

const credentialConfig = {
  issuerAddress: wallet.address,
  targetAddress: investorAddress,
  credentialType: 'BR-Investor-Verified',
  credentialValue: {
    verified: true,
    verifiedAt: new Date(),
    level: 'standard'
  }
};

const credential = await credentials.issueCredential(credentialConfig, wallet);
console.log('Credential emitida:', credential.id);
```

### Exemplo 4: Criar Ordem de Compra

```typescript
import { DEXContract } from './contracts/xrpl';

const dex = new DEXContract('testnet');

const orderConfig = {
  account: wallet.address,
  takerPays: '1000', // 1000 XRP
  takerGets: {
    currency: 'MPT_APT001',
    value: '1250',
    issuer: issuerAddress
  }
};

const orderHash = await dex.createBuyOrder(orderConfig, wallet);
console.log('Ordem criada:', orderHash);
```

---

## 🔧 Configuração

### Variáveis de Ambiente

```bash
# .env
XRPL_NETWORK=testnet
XRPL_SECRET=s... # Secret da sua wallet (DESENVOLVIMENTO APENAS)
```

### Networks

- `testnet` - XRPL Testnet (padrão para desenvolvimento)
- `mainnet` - XRPL Mainnet (produção)
- `devnet` - XRPL Devnet (testes internos)

---

## 📚 Documentação Completa

Consulte o arquivo `Documentacao_Contratos_XRPL.md` para documentação completa de:
- Arquitetura
- Fluxos de operação
- Segurança e compliance
- Testing

---

## 🧪 Testing

```bash
# Testar todos os contratos
npm test

# Testar um contrato específico
npm test -- MPTContract.test.ts
```

---

## ⚠️ Importante

### Segurança

1. **NUNCA** commite secrets ou wallets reais
2. Use variáveis de ambiente para credenciais
3. Sempre teste em testnet antes de mainnet
4. Valide todas as transações antes de submeter

### Limitações Atuais

- MPT (IssueSet) ainda não está disponível no XRPL (usando NFTokenMint como placeholder)
- Credentials ainda não estão disponíveis (usando NFTs como placeholder)
- AMM features precisam de configuração adicional

---

## 🚀 Deploy dos Contratos

### Pré-requisitos

1. **Instalar dependências:**
   ```bash
   npm install
   ```

2. **Configurar variáveis de ambiente:**
   ```bash
   cp contracts/env.example contracts/.env
   # Edite contracts/.env e adicione seu XRPL_ISSUER_SECRET
   ```

3. **Obter fundos de teste (Testnet):**
   - Acesse: https://xrpl.org/xrp-testnet-faucet.html
   - Cole seu endereço e solicite fundos
   - Anote o secret da wallet gerada

### Como fazer o Deploy

#### Deploy Completo em Testnet

```bash
npm run deploy:testnet
```

Ou manualmente:

```bash
# Com secret inline
npm run deploy:contracts -- --network=testnet --secret=sYourSecretHere
```

#### Deploy Completo em Mainnet

```bash
# ⚠️ CUIDADO: Deploy em produção
npm run deploy:mainnet
```

Ou:

```bash
npm run deploy:contracts -- --network=mainnet --secret=sYourSecretHere
```

#### Deploy Parcial

Deploy apenas um tipo de contrato:

```bash
# Apenas Credentials
npm run deploy:contracts -- --network=testnet --secret=sSecret --only-credentials

# Apenas MPT
npm run deploy:contracts -- --network=testnet --secret=sSecret --only-mpt
```

### O que o Deploy Faz?

1. **Verifica Pré-requisitos:**
   - Conecta à network XRPL
   - Verifica saldo da wallet
   - Valida configuração

2. **Deploy dos Contratos:**
   - **Credentials Contract**: Testa emissão de credentials
   - **MPT Contract**: Cria um MPT de teste
   - **Escrow Contract**: Cria um Escrow de teste
   - **DEX Contract**: Verifica disponibilidade do DEX

3. **Gera Relatório:**
   - Salva logs em `contracts/deploy-reports/`
   - Inclui hash das transações
   - Mostra resumo do deploy

### Relatórios de Deploy

Após o deploy, você encontrará relatórios em:

```
contracts/deploy-reports/
  ├── deploy-testnet-2025-01-15T10-30-00-000Z.json
  └── deploy-testnet-2025-01-15T10-30-00-000Z.log
```

### Exemplo de Relatório

```json
{
  "network": "testnet",
  "timestamp": "2025-01-15T10:30:00.000Z",
  "summary": {
    "successful": 4,
    "failed": 0,
    "total": 4
  },
  "results": [
    {
      "success": true,
      "contract": "CredentialsContract",
      "network": "testnet",
      "transactionHash": "ABC123...",
      "addresses": {
        "issuer": "rIssuer...",
        "holder": "rHolder..."
      }
    }
  ]
}
```

## 🚀 Próximos Passos

1. **✅ Deploy em Testnet**: Script criado e pronto
2. **Security Audit**: Auditoria de segurança recomendada
3. **Mainnet Deploy**: Deploy em produção (após auditoria)
4. **Monitoring**: Setup de monitoramento

---

**TokenCasa** 🏠 - Fracionamento de Imóveis no XRPL  
**Powered by Native XRPL Features** ⚡
