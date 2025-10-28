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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
let UsersService = class UsersService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async findAll() {
        return this.usersRepository.find();
    }
    async findOne(address) {
        return this.usersRepository.findOne({ where: { address } });
    }
    async createOrUpdate(userData) {
        let user = await this.findOne(userData.address);
        if (!user) {
            user = this.usersRepository.create(userData);
        }
        else {
            Object.assign(user, userData);
        }
        return this.usersRepository.save(user);
    }
    async verifyKYC(kycData) {
        console.log('Verificando KYC:', kycData);
        const user = await this.createOrUpdate({
            address: kycData.address,
            email: kycData.email,
            kycVerified: true,
            credentialId: 'BR-Investor-Verified',
            kycData: {
                name: kycData.name,
                document: kycData.document,
                verifiedAt: new Date(),
            },
        });
        return {
            verified: true,
            credential: 'BR-Investor-Verified',
            address: user.address,
            user,
            timestamp: new Date(),
        };
    }
    async hasCredential(address, credentialId) {
        const user = await this.findOne(address);
        return user?.credentialId === credentialId;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map