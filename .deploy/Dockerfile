# Backend Dockerfile
FROM node:18-alpine AS backend

WORKDIR /app

COPY backend/package*.json ./
RUN npm ci --only=production

COPY backend/ .
RUN npm run build

FROM node:18-alpine

WORKDIR /app

COPY --from=backend /app/dist ./dist
COPY --from=backend /app/package*.json ./

RUN npm ci --only=production

CMD ["node", "dist/main.js"]

# Frontend Dockerfile
FROM node:18-alpine AS frontend

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:18-alpine

WORKDIR /app

COPY --from=frontend /app/package*.json ./
COPY --from=frontend /app/.next ./.next
COPY --from=frontend /app/public ./public

RUN npm ci --only=production

CMD ["npm", "start"]

