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
exports.IPFSService = void 0;
const common_1 = require("@nestjs/common");
const pinata_1 = require("pinata");
let IPFSService = class IPFSService {
    constructor() {
        const apiKey = process.env.PINATA_API_KEY;
        const secretKey = process.env.PINATA_SECRET_KEY;
        if (apiKey && secretKey) {
            this.pinata = new pinata_1.PinataSDK({
                pinataJwt: secretKey,
                pinataGateway: 'gateway.pinata.cloud',
            });
        }
    }
    async uploadFile(file, fileName) {
        try {
            if (this.pinata) {
                console.log('Upload para IPFS (mock):', fileName);
            }
            return 'QmMock' + Date.now();
        }
        catch (error) {
            console.error('Erro ao fazer upload para IPFS:', error);
            return 'QmMockError' + Date.now();
        }
    }
    async uploadMetadata(metadata) {
        try {
            if (this.pinata) {
                console.log('Upload metadata para IPFS (mock)');
            }
            return 'QmMetadata' + Date.now();
        }
        catch (error) {
            console.error('Erro ao fazer upload de metadata:', error);
            return 'QmMetadataError' + Date.now();
        }
    }
    getFileUrl(hash) {
        return `https://gateway.pinata.cloud/ipfs/${hash}`;
    }
};
exports.IPFSService = IPFSService;
exports.IPFSService = IPFSService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], IPFSService);
//# sourceMappingURL=ipfs.service.js.map