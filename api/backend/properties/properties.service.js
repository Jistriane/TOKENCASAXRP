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
exports.PropertiesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const property_entity_1 = require("./entities/property.entity");
const xrpl_service_1 = require("../xrpl/xrpl.service");
const ipfs_service_1 = require("../ipfs/ipfs.service");
const oracles_service_1 = require("../oracles/oracles.service");
let PropertiesService = class PropertiesService {
    constructor(propertiesRepository, xrplService, ipfsService, oraclesService) {
        this.propertiesRepository = propertiesRepository;
        this.xrplService = xrplService;
        this.ipfsService = ipfsService;
        this.oraclesService = oraclesService;
    }
    async findAll() {
        return this.propertiesRepository.find({
            where: { tokenized: true },
            order: { createdAt: 'DESC' },
        });
    }
    async findOne(id) {
        const property = await this.propertiesRepository.findOne({ where: { id } });
        if (!property) {
            throw new Error('Imóvel não encontrado');
        }
        return property;
    }
    async create(createPropertyDto) {
        const propertyPrice = await this.oraclesService.getPropertyPrice(createPropertyDto.address);
        if (!createPropertyDto.totalPrice) {
            createPropertyDto.totalPrice = propertyPrice;
        }
        if (!createPropertyDto.pricePerToken && createPropertyDto.totalTokens > 0) {
            createPropertyDto.pricePerToken = createPropertyDto.totalPrice / createPropertyDto.totalTokens;
        }
        const property = this.propertiesRepository.create(createPropertyDto);
        return this.propertiesRepository.save(property);
    }
    async tokenize(id) {
        const property = await this.findOne(id);
        if (property.tokenized) {
            throw new Error('Imóvel já foi tokenizado');
        }
        const metadata = {
            title: property.title,
            address: property.address,
            city: property.city,
            state: property.state,
            totalPrice: property.totalPrice,
            totalTokens: property.totalTokens,
            pricePerToken: property.pricePerToken,
            yieldAnnual: property.yieldAnnual,
            type: property.type,
            area: property.area,
            description: property.description,
            images: property.images,
            documents: property.documents,
        };
        const ipfsHash = await this.ipfsService.uploadMetadata(metadata);
        property.ipfsMetadataHash = ipfsHash;
        const mptId = await this.xrplService.createMPT(property.ownerAddress, ipfsHash, property.totalTokens);
        property.mptId = mptId;
        property.tokenized = true;
        await this.propertiesRepository.save(property);
        return {
            success: true,
            property,
            mpt: { id: mptId },
            message: 'Imóvel tokenizado com sucesso!',
        };
    }
    async uploadDocuments(id, documents) {
        const property = await this.findOne(id);
        for (const [key, documentPath] of Object.entries(documents)) {
            if (documentPath) {
                property.documents[key] = documentPath;
            }
        }
        return this.propertiesRepository.save(property);
    }
    async assessProperty(id) {
        const property = await this.findOne(id);
        const assessedValue = await this.oraclesService.getAssessedValue(property.address);
        const marketPrice = await this.oraclesService.getPropertyPrice(property.address);
        return { assessedValue, marketValue: marketPrice };
    }
    async updateYield(id) {
        const property = await this.findOne(id);
        const currentYield = await this.oraclesService.getPropertyYield(id);
        property.yieldAnnual = currentYield;
        return this.propertiesRepository.save(property);
    }
};
exports.PropertiesService = PropertiesService;
exports.PropertiesService = PropertiesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(property_entity_1.Property)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        xrpl_service_1.XRPLService,
        ipfs_service_1.IPFSService,
        oracles_service_1.OraclesService])
], PropertiesService);
//# sourceMappingURL=properties.service.js.map