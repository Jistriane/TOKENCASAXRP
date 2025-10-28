"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsService = void 0;
const common_1 = require("@nestjs/common");
let NotificationsService = class NotificationsService {
    constructor() {
        this.sendgrid = null;
        const sendgridKey = process.env.SENDGRID_API_KEY;
        if (sendgridKey) {
            try {
                const sgMail = require('@sendgrid/mail');
                sgMail.setApiKey(sendgridKey);
                this.sendgrid = sgMail;
            }
            catch (error) {
                console.log('SendGrid não instalado');
            }
        }
    }
    async sendEmail(to, subject, content) {
        try {
            if (!this.sendgrid) {
                console.log('SendGrid não configurado. Email simulado:', { to, subject });
                return { success: true, simulated: true };
            }
            const msg = {
                to,
                from: process.env.SENDGRID_FROM || 'noreply@tokencasa.com',
                subject,
                html: content,
            };
            await this.sendgrid.send(msg);
            console.log('Email enviado:', to);
            return { success: true };
        }
        catch (error) {
            console.error('Erro ao enviar email:', error);
            return { success: false, error };
        }
    }
    async sendRentNotification(to, propertyName, amount) {
        const subject = '💰 Aluguel Recebido - TokenCasa';
        const content = `
      <h1>Você recebeu aluguel! 🎉</h1>
      <p>Propriedade: ${propertyName}</p>
      <p>Valor: R$ ${amount.toFixed(2)}</p>
      <p><a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}">Ver detalhes no TokenCasa</a></p>
    `;
        return this.sendEmail(to, subject, content);
    }
    async sendTransactionNotification(to, txType, amount) {
        const subject = `✅ Transação ${txType} - TokenCasa`;
        const content = `
      <h1>Transação ${txType}</h1>
      <p>Valor: R$ ${amount.toFixed(2)}</p>
      <p><a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/transactions">Ver histórico</a></p>
    `;
        return this.sendEmail(to, subject, content);
    }
};
exports.NotificationsService = NotificationsService;
exports.NotificationsService = NotificationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], NotificationsService);
//# sourceMappingURL=notifications.service.js.map