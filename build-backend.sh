#!/bin/bash

echo "🔨 Building Backend for Vercel..."

# Ir para o diretório do backend
cd backend

# Instalar dependências
echo "📦 Installing dependencies..."
npm install

# Build do NestJS
echo "🔨 Building NestJS..."
npm run build

# Voltar para o root e criar diretório de destino
cd ..
mkdir -p api/backend

# Copiar arquivos compilados
echo "📋 Copying compiled files..."
cp -r backend/dist/* api/backend/

# Copiar serverless.js
echo "📋 Copying serverless handler..."
cp api/backend/serverless.js api/backend/

# Copiar node_modules específicos do backend
echo "📦 Copying backend dependencies..."
mkdir -p api/backend/node_modules
cp -r backend/node_modules/@nestjs api/backend/node_modules/ 2>/dev/null || true
cp -r backend/node_modules/@sendgrid api/backend/node_modules/ 2>/dev/null || true
cp backend/node_modules/axios api/backend/node_modules/ -r 2>/dev/null || true
cp backend/node_modules/class-transformer api/backend/node_modules/ -r 2>/dev/null || true
cp backend/node_modules/class-validator api/backend/node_modules/ -r 2>/dev/null || true
cp backend/node_modules/pg api/backend/node_modules/ -r 2>/dev/null || true
cp backend/node_modules/pinata api/backend/node_modules/ -r 2>/dev/null || true
cp backend/node_modules/reflect-metadata api/backend/node_modules/ -r 2>/dev/null || true
cp backend/node_modules/rxjs api/backend/node_modules/ -r 2>/dev/null || true
cp backend/node_modules/serverless-http api/backend/node_modules/ -r 2>/dev/null || true
cp backend/node_modules/typeorm api/backend/node_modules/ -r 2>/dev/null || true
cp backend/node_modules/web-push api/backend/node_modules/ -r 2>/dev/null || true
cp backend/node_modules/xrpl api/backend/node_modules/ -r 2>/dev/null || true

echo "✅ Backend build complete!"

