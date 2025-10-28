"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EscrowService = void 0;
const common_1 = require("@nestjs/common");
let EscrowService = class EscrowService {
    async distribute(distributionData) {
        console.log('Distribuindo aluguel via Escrow:', distributionData);
        const { propertyId, totalRent, totalTokens, holders } = distributionData;
        const rentPerToken = totalRent / totalTokens;
        const distributions = holders.map((holder) => ({
            address: holder.address,
            tokens: holder.tokens,
            payment: holder.tokens * rentPerToken,
            distributedAt: new Date(),
        }));
        return {
            success: true,
            propertyId,
            totalRent,
            rentPerToken,
            distributions,
        };
    }
    async getHistory() {
        return [];
    }
};
exports.EscrowService = EscrowService;
exports.EscrowService = EscrowService = __decorate([
    (0, common_1.Injectable)()
], EscrowService);
//# sourceMappingURL=escrow.service.js.map