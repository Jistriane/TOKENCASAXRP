#!/bin/bash

echo "🚀 TokenCasa - Iniciando Frontend + Backend"
echo "════════════════════════════════════════════"

# Cores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Verificar se backend está configurado
if [ ! -f "backend/.env" ]; then
    echo -e "${YELLOW}⚠️  backend/.env não encontrado${NC}"
    echo "Executando setup..."
    ./setup-complete.sh
fi

# Verificar se backend tem node_modules
if [ ! -d "backend/node_modules" ]; then
    echo -e "${YELLOW}⚠️  Instalando dependências do backend...${NC}"
    cd backend && npm install && cd ..
fi

# Verificar se frontend tem node_modules
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}⚠️  Instalando dependências do frontend...${NC}"
    npm install
fi

echo ""
echo -e "${GREEN}✅ Tudo configurado!${NC}"
echo ""
echo "Iniciando servidores..."
echo ""
echo "Frontend: http://localhost:3000"
echo "Backend:  http://localhost:3001"
echo ""
echo "Pressione Ctrl+C para parar"
echo ""

npm run dev

