"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RentalService = void 0;
const common_1 = require("@nestjs/common");
let RentalService = class RentalService {
    async processRentPayment(paymentData) {
        console.log('Processando pagamento de aluguel:', paymentData);
        const isValid = await this.validatePayment(paymentData);
        if (isValid) {
            return {
                success: true,
                rentalPaymentId: 'rent_' + Date.now(),
                distributed: true,
            };
        }
        return { success: false, error: 'Pagamento inválido' };
    }
    async getRentalHistory(propertyId) {
        return [
            {
                date: '2024-06-05',
                amount: 6000,
                tenants: 10,
                status: 'received',
            },
            {
                date: '2024-05-05',
                amount: 6000,
                tenants: 10,
                status: 'received',
            },
        ];
    }
    async distributeRent(distributionData) {
        const { propertyId, totalRent, holders } = distributionData;
        const totalTokens = holders.reduce((sum, h) => sum + h.tokens, 0);
        const rentPerToken = totalRent / totalTokens;
        const distributions = holders.map((holder) => ({
            address: holder.address,
            tokens: holder.tokens,
            payment: holder.tokens * rentPerToken,
            calculatedAt: new Date(),
        }));
        return {
            success: true,
            propertyId,
            totalRent,
            rentPerToken,
            distributions,
        };
    }
    async validatePayment(paymentData) {
        return true;
    }
};
exports.RentalService = RentalService;
exports.RentalService = RentalService = __decorate([
    (0, common_1.Injectable)()
], RentalService);
//# sourceMappingURL=rental.service.js.map