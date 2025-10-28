"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PushService = void 0;
const common_1 = require("@nestjs/common");
let PushService = class PushService {
    async subscribe(subscription, userId) {
        try {
            console.log('Registrando subscription push (mock):', userId);
            return true;
        }
        catch (error) {
            console.error('Erro ao registrar subscription:', error);
            return false;
        }
    }
    async sendNotification(subscription, payload) {
        try {
            console.log('Notificação push enviada (mock)');
            return true;
        }
        catch (error) {
            console.error('Erro ao enviar notificação push:', error);
            return false;
        }
    }
    async notifyRentReceived(userId, propertyName, amount) {
        const subscriptions = await this.getUserSubscriptions(userId);
        for (const sub of subscriptions) {
            await this.sendNotification(sub, {
                title: '💰 Aluguel Recebido',
                body: `Você recebeu R$ ${amount.toFixed(2)} do ${propertyName}`,
                icon: '/icon-192x192.png',
                badge: '/icon-192x192.png',
                data: {
                    url: '/portfolio',
                    type: 'rent',
                    amount,
                    propertyName,
                },
            });
        }
    }
    async notifyTransaction(userId, txType, amount) {
        const subscriptions = await this.getUserSubscriptions(userId);
        for (const sub of subscriptions) {
            await this.sendNotification(sub, {
                title: `✅ Transação ${txType}`,
                body: `Valor: R$ ${amount.toFixed(2)}`,
                icon: '/icon-192x192.png',
                data: {
                    url: '/transactions',
                    type: 'transaction',
                    txType,
                    amount,
                },
            });
        }
    }
    async getUserSubscriptions(userId) {
        return [];
    }
};
exports.PushService = PushService;
exports.PushService = PushService = __decorate([
    (0, common_1.Injectable)()
], PushService);
//# sourceMappingURL=push.service.js.map