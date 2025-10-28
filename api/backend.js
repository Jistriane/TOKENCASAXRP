// Serverless function para backend NestJS na Vercel
const serverless = require('serverless-http');
const path = require('path');

async function createApp() {
  const { NestFactory } = require('@nestjs/core');
  
  // Importar do backend compilado
  const backendPath = path.join(__dirname, '../backend/dist');
  const { AppModule } = require(path.join(backendPath, 'app.module'));
  
  const app = await NestFactory.create(AppModule, {
    logger: false,
  });
  
  app.enableCors({
    origin: process.env.FRONTEND_URL || '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  });
  
  app.setGlobalPrefix('api');
  
  await app.init();
  
  return app.getHttpAdapter().getInstance();
}

let cachedApp;

async function getApp() {
  if (!cachedApp) {
    cachedApp = await createApp();
  }
  return cachedApp;
}

module.exports = async (req, res) => {
  try {
    const app = await getApp();
    const handler = serverless(app, {
      binary: ['image/*', 'application/octet-stream', 'application/pdf'],
    });
    return handler(req, res);
  } catch (error) {
    console.error('Error in serverless handler:', error);
    return res.status(500).json({ error: error.message });
  }
};

