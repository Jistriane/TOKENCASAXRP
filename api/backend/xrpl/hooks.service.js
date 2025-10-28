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
exports.HooksService = void 0;
const common_1 = require("@nestjs/common");
const xrpl_service_1 = require("./xrpl.service");
const escrow_service_1 = require("../escrow/escrow.service");
const notifications_service_1 = require("../notifications/notifications.service");
let HooksService = class HooksService {
    constructor(xrplService, escrowService, notificationsService) {
        this.xrplService = xrplService;
        this.escrowService = escrowService;
        this.notificationsService = notificationsService;
    }
    async validatePurchase(address, mptId) {
        try {
            return true;
        }
        catch (error) {
            console.error('Erro na validação do hook:', error);
            return false;
        }
    }
    async onRentAvailable(propertyId, rentAmount) {
        try {
            console.log(`🚨 Hook disparado: Aluguel disponível para ${propertyId}`);
            const holders = await this.getPropertyHolders(propertyId);
            if (holders.length === 0) {
                console.log('Nenhum holder encontrado');
                return;
            }
            const totalTokens = await this.getTotalTokens(propertyId);
            const rentPerToken = rentAmount / totalTokens;
            console.log(`💰 Distribuindo aluguel: R$ ${rentAmount} para ${holders.length} holders`);
            const distributions = holders.map(holder => ({
                address: holder.address,
                tokens: holder.tokens,
                payment: holder.tokens * rentPerToken,
            }));
            for (const dist of distributions) {
                await this.notificationsService.sendRentNotification(dist.address, `Imóvel ${propertyId}`, dist.payment);
            }
            console.log('✅ Aluguel distribuído via hook');
        }
        catch (error) {
            console.error('Erro no hook de aluguel:', error);
        }
    }
    async validateTransfer(from, to, mptId, amount) {
        try {
            const fromHasCredential = await this.hasCredential(from);
            const toHasCredential = await this.hasCredential(to);
            if (!fromHasCredential || !toHasCredential) {
                console.log('❌ Transfer rejeitado: sem credential');
                return false;
            }
            return true;
        }
        catch (error) {
            console.error('Erro na validação de transfer:', error);
            return false;
        }
    }
    async onCreateEscrow(propertyId, amount, releaseDate) {
        try {
            console.log(`🔒 Criando Escrow para ${propertyId}: R$ ${amount}`);
            const escrowId = await this.xrplService.createEscrow(propertyId, amount.toString(), JSON.stringify({
                propertyId,
                releaseDate: releaseDate.toISOString(),
            }));
            console.log(`✅ Escrow criado: ${escrowId}`);
            return escrowId;
        }
        catch (error) {
            console.error('Erro ao criar Escrow:', error);
            throw error;
        }
    }
    async onEscrowRelease(escrowId) {
        try {
            console.log(`🔓 Hook de release do Escrow: ${escrowId}`);
            console.log('✅ Escrow liberado via hook');
        }
        catch (error) {
            console.error('Erro no release de Escrow:', error);
        }
    }
    async getPropertyHolders(propertyId) {
        return [
            { address: 'rAddress1', tokens: 625 },
            { address: 'rAddress2', tokens: 1333 },
        ];
    }
    async getTotalTokens(propertyId) {
        return 1000000;
    }
    async hasCredential(address) {
        return true;
    }
};
exports.HooksService = HooksService;
exports.HooksService = HooksService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [xrpl_service_1.XRPLService,
        escrow_service_1.EscrowService,
        notifications_service_1.NotificationsService])
], HooksService);
//# sourceMappingURL=hooks.service.js.map