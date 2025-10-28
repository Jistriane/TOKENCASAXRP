# TokenCasa Backend

Backend NestJS para TokenCasa com integração XRPL.

## 🚀 Como Executar

### 1. Instalar dependências
```bash
cd backend
npm install
```

### 2. Configurar variáveis de ambiente
```bash
cp .env.example .env
# Editar .env com suas credenciais
```

### 3. Executar
```bash
# Desenvolvimento
npm run dev

# Produção
npm run build
npm start
```

## 📋 Stack

- **NestJS** - Framework backend
- **TypeORM** - ORM para PostgreSQL
- **PostgreSQL** - Banco de dados
- **XRPL** - Integração blockchain
- **Pinata** - IPFS storage
- **SendGrid** - Email

## 🔗 Endpoints

- `GET /api/properties` - Lista imóveis
- `POST /api/properties` - Cria novo imóvel
- `POST /api/properties/:id/tokenize` - Tokeniza imóvel
- `POST /api/escrow/distribute` - Distribui aluguel

