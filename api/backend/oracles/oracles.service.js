"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OraclesService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
let OraclesService = class OraclesService {
    constructor() {
        this.chainlinkUrl = process.env.CHAINLINK_URL || 'https://api.chainlink.com';
    }
    async getPropertyPrice(propertyAddress) {
        try {
            const response = await axios_1.default.get(`${this.chainlinkUrl}/price/${propertyAddress}`);
            return response.data.price;
        }
        catch (error) {
            console.log('Chainlink não configurado. Usando mock data.');
            return this.generateMockPrice(propertyAddress);
        }
    }
    async getAssessedValue(propertyAddress) {
        try {
            const response = await axios_1.default.get(`https://api.propertyvalue.com/${propertyAddress}`);
            return response.data.assessedValue;
        }
        catch (error) {
            console.log('API de avaliação não configurada. Usando mock.');
            return this.estimatePropertyValue(propertyAddress);
        }
    }
    async verifyRentPayment(propertyId, expectedAmount) {
        try {
            const apiUrl = process.env.PROPERTY_MANAGER_API;
            if (apiUrl) {
                const response = await axios_1.default.post(`${apiUrl}/verify-payment`, {
                    propertyId,
                    amount: expectedAmount,
                });
                return response.data.verified;
            }
            console.log('API de aluguel não configurada. Simulando pagamento.');
            return true;
        }
        catch (error) {
            console.error('Erro ao verificar pagamento:', error);
            return false;
        }
    }
    async getPropertyYield(propertyId) {
        try {
            const rentData = await this.getMonthlyRent(propertyId);
            const propertyPrice = await this.getPropertyPrice(propertyId);
            const annualYield = (rentData * 12 / propertyPrice) * 100;
            return annualYield;
        }
        catch (error) {
            console.log('Usando yield mockado');
            return 9.5;
        }
    }
    generateMockPrice(address) {
        let basePrice = 500000;
        if (address.includes('Rio de Janeiro') || address.includes('São Paulo')) {
            basePrice = 800000;
        }
        else if (address.includes('Fortaleza') || address.includes('Salvador')) {
            basePrice = 600000;
        }
        return basePrice;
    }
    estimatePropertyValue(address) {
        return this.generateMockPrice(address);
    }
    async getMonthlyRent(propertyId) {
        return 6000;
    }
};
exports.OraclesService = OraclesService;
exports.OraclesService = OraclesService = __decorate([
    (0, common_1.Injectable)()
], OraclesService);
//# sourceMappingURL=oracles.service.js.map