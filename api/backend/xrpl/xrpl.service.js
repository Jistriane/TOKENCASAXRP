"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.XRPLService = void 0;
const common_1 = require("@nestjs/common");
const xrpl_1 = require("xrpl");
let XRPLService = class XRPLService {
    constructor() {
        this.network = process.env.XRPL_NETWORK || 'testnet';
    }
    async onModuleInit() {
        const endpoint = this.network === 'mainnet'
            ? 'wss://xrplcluster.com'
            : 'wss://s.altnet.rippletest.net:51233';
        this.client = new xrpl_1.Client(endpoint);
        await this.client.connect();
        console.log('✅ Conectado ao XRPL:', this.network);
    }
    async createMPT(ownerAddress, metadataHash, totalSupply) {
        console.log('Criando MPT:', { ownerAddress, metadataHash, totalSupply });
        return 'mpt_' + Date.now();
    }
    async createEscrow(propertyId, amount, condition) {
        try {
            console.log('Criando Escrow:', { propertyId, amount });
            return 'escrow_' + Date.now();
        }
        catch (error) {
            console.error('Erro ao criar Escrow:', error);
            throw error;
        }
    }
    async submitTransaction(tx) {
        try {
            const response = await this.client.submit(tx);
            if (response.result.engine_result === 'tesSUCCESS' || response.result.accepted) {
                return response.result.tx_json.hash || response.result.tx_blob;
            }
            throw new Error('Transação falhou: ' + response.result.engine_result);
        }
        catch (error) {
            console.error('Erro ao submeter transação:', error);
            throw error;
        }
    }
    async getAccountInfo(address) {
        try {
            const accountInfo = await this.client.request({
                command: 'account_info',
                account: address,
            });
            return accountInfo.result;
        }
        catch (error) {
            console.error('Erro ao buscar account info:', error);
            throw error;
        }
    }
    async createOffer(account, takerPays, takerGets) {
        try {
            const tx = {
                TransactionType: 'OfferCreate',
                Account: account,
                TakerPays: takerPays,
                TakerGets: takerGets,
            };
            return await this.submitTransaction(tx);
        }
        catch (error) {
            console.error('Erro ao criar offer:', error);
            throw error;
        }
    }
};
exports.XRPLService = XRPLService;
exports.XRPLService = XRPLService = __decorate([
    (0, common_1.Injectable)()
], XRPLService);
//# sourceMappingURL=xrpl.service.js.map