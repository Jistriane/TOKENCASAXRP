#!/bin/bash

echo "🚀 TokenCasa Backend - Setup Script"
echo ""

# Verificar Node.js
if ! command -v node &> /dev/null
then
    echo "❌ Node.js não encontrado. Instale Node.js 18+"
    exit 1
fi

echo "✅ Node.js encontrado: $(node -v)"

# Verificar PostgreSQL
if ! command -v psql &> /dev/null
then
    echo "⚠️  PostgreSQL não encontrado. Será necessário configurar manualmente."
else
    echo "✅ PostgreSQL encontrado"
fi

# Instalar dependências
echo ""
echo "📦 Instalando dependências..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Erro ao instalar dependências"
    exit 1
fi

echo "✅ Dependências instaladas"

# Verificar .env
if [ ! -f .env ]; then
    echo ""
    echo "⚠️  Arquivo .env não encontrado"
    echo "📝 Criando .env a partir de .env.example..."
    cp .env.example .env
    echo "⚠️  IMPORTANTE: Configure o arquivo .env com suas credenciais!"
else
    echo "✅ Arquivo .env encontrado"
fi

echo ""
echo "🎉 Setup completo!"
echo ""
echo "📋 Próximos passos:"
echo "   1. Configure o arquivo .env"
echo "   2. Crie o database PostgreSQL: createdb tokencasa"
echo "   3. Execute: npm run dev"
echo ""

