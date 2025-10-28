"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
let appInstance;
async function bootstrap() {
    if (!appInstance) {
        appInstance = await core_1.NestFactory.create(app_module_1.AppModule);
        appInstance.enableCors({
            origin: process.env.FRONTEND_URL || '*',
            credentials: true,
        });
        appInstance.setGlobalPrefix('api');
        await appInstance.init();
    }
    return appInstance;
}
const handler = async (event, context, callback) => {
    const app = await bootstrap();
    const server = app.getHttpAdapter().getInstance();
    const handler = require('serverless-http')(server);
    return handler(event, context, callback);
};
exports.handler = handler;
//# sourceMappingURL=serverless.js.map