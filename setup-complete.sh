#!/bin/bash

echo "🚀 TokenCasa - Setup Completo Automatizado"
echo "════════════════════════════════════════════"
echo ""

# Cores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Função para verificar comando
check_command() {
    if command -v $1 &> /dev/null; then
        echo -e "${GREEN}✅ $1 encontrado${NC}"
        return 0
    else
        echo -e "${RED}❌ $1 NÃO encontrado${NC}"
        return 1
    fi
}

echo "📋 Verificando pré-requisitos..."
echo ""

# Verificar Node.js
if check_command node; then
    echo "   Version: $(node -v)"
else
    echo -e "${RED}❌ Instale Node.js 18+: https://nodejs.org${NC}"
    exit 1
fi

# Verificar npm
if check_command npm; then
    echo "   Version: $(npm -v)"
else
    echo -e "${RED}❌ npm não encontrado${NC}"
    exit 1
fi

# Verificar PostgreSQL
if check_command psql; then
    echo -e "${GREEN}✅ PostgreSQL encontrado${NC}"
else
    echo -e "${YELLOW}⚠️  PostgreSQL não encontrado. Será necessário instalar manualmente.${NC}"
    echo "   Ubuntu/Debian: sudo apt install postgresql"
    echo "   macOS: brew install postgresql"
fi

echo ""
echo "════════════════════════════════════════════"
echo "📦 Setup Backend"
echo "════════════════════════════════════════════"
echo ""

cd backend 2>/dev/null || { echo -e "${RED}❌ Pasta backend não encontrada${NC}"; exit 1; }

# Copiar .env se não existir
if [ ! -f .env ]; then
    echo "📝 Criando .env a partir de .env.example..."
    cp .env.example .env
    echo -e "${YELLOW}⚠️  EDITAR .env COM SUAS CREDENCIAIS!${NC}"
else
    echo -e "${GREEN}✅ .env já existe${NC}"
fi

# Instalar dependências
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependências do backend..."
    npm install
    if [ $? -ne 0 ]; then
        echo -e "${RED}❌ Erro ao instalar dependências${NC}"
        exit 1
    fi
    echo -e "${GREEN}✅ Dependências instaladas${NC}"
else
    echo -e "${GREEN}✅ Dependências já instaladas${NC}"
fi

cd ..

echo ""
echo "════════════════════════════════════════════"
echo "📦 Setup Frontend"
echo "════════════════════════════════════════════"
echo ""

# Copiar .env.local se não existir
if [ ! -f .env.local ]; then
    echo "📝 Criando .env.local a partir de .env.local.example..."
    cp .env.local.example .env.local
    echo -e "${YELLOW}⚠️  EDITAR .env.local COM SUAS CREDENCIAIS!${NC}"
else
    echo -e "${GREEN}✅ .env.local já existe${NC}"
fi

# Instalar dependências
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependências do frontend..."
    npm install
    if [ $? -ne 0 ]; then
        echo -e "${RED}❌ Erro ao instalar dependências${NC}"
        exit 1
    fi
    echo -e "${GREEN}✅ Dependências instaladas${NC}"
else
    echo -e "${GREEN}✅ Dependências já instaladas${NC}"
fi

echo ""
echo "════════════════════════════════════════════"
echo "✅ Setup Completo!"
echo "════════════════════════════════════════════"
echo ""
echo "📋 Próximos passos:"
echo ""
echo "1. Configurar API keys:"
echo "   • Pinata: https://app.pinata.cloud/keys"
echo "   • SendGrid: https://app.sendgrid.com/settings/api_keys"
echo ""
echo "2. Editar arquivos .env:"
echo "   • backend/.env"
echo "   • .env.local"
echo ""
echo "3. Criar database PostgreSQL:"
echo "   createdb tokencasa"
echo ""
echo "4. Executar:"
echo "   # Backend"
echo "   cd backend && npm run dev"
echo ""
echo "   # Frontend (nova janela)"
echo "   npm run dev"
echo ""
echo "✅ Tudo pronto para rodar!"
echo ""
echo -e "${GREEN}TokenCasa - Pronto para Produção 🏠${NC}"
echo -e "${GREEN}Powered by XRPL ⚡${NC}"

