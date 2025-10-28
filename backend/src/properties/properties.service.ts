import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Property } from './entities/property.entity';
import { CreatePropertyDto } from './dto/create-property.dto';
import { XRPLService } from '../xrpl/xrpl.service';
import { IPFSService } from '../ipfs/ipfs.service';
import { OraclesService } from '../oracles/oracles.service';

@Injectable()
export class PropertiesService {
  constructor(
    @InjectRepository(Property)
    private propertiesRepository: Repository<Property>,
    private xrplService: XRPLService,
    private ipfsService: IPFSService,
    private oraclesService: OraclesService,
  ) {}

  async findAll(): Promise<Property[]> {
    return this.propertiesRepository.find({
      where: { tokenized: true },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Property> {
    const property = await this.propertiesRepository.findOne({ where: { id } });
    if (!property) {
      throw new Error('Imóvel não encontrado');
    }
    return property;
  }

  async create(createPropertyDto: CreatePropertyDto): Promise<Property> {
    // Buscar preço via Oracle (Chainlink)
    const propertyPrice = await this.oraclesService.getPropertyPrice(createPropertyDto.address);
    
    // Se não tiver preço, usar o fornecido
    if (!createPropertyDto.totalPrice) {
      createPropertyDto.totalPrice = propertyPrice;
    }

    // Calcular preço por token se não fornecido
    if (!createPropertyDto.pricePerToken && createPropertyDto.totalTokens > 0) {
      createPropertyDto.pricePerToken = createPropertyDto.totalPrice / createPropertyDto.totalTokens;
    }

    const property = this.propertiesRepository.create(createPropertyDto);
    return this.propertiesRepository.save(property);
  }

  async tokenize(id: string): Promise<any> {
    const property = await this.findOne(id);
    
    if (property.tokenized) {
      throw new Error('Imóvel já foi tokenizado');
    }

    // Upload de metadata para IPFS
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

    // Criar MPT no XRPL
    const mptId = await this.xrplService.createMPT(
      property.ownerAddress,
      ipfsHash,
      property.totalTokens,
    );

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

  async uploadDocuments(id: string, documents: { matricula?: string; iptu?: string; contrato?: string }): Promise<Property> {
    const property = await this.findOne(id);
    
    // Upload de documentos para IPFS
    for (const [key, documentPath] of Object.entries(documents)) {
      if (documentPath) {
        // Em produção, processaria o upload real do arquivo
        property.documents[key] = documentPath;
      }
    }

    return this.propertiesRepository.save(property);
  }

  async assessProperty(id: string): Promise<{ assessedValue: number; marketValue: number }> {
    const property = await this.findOne(id);
    
    // Buscar valor via Oracle
    const assessedValue = await this.oraclesService.getAssessedValue(property.address);
    const marketPrice = await this.oraclesService.getPropertyPrice(property.address);
    
    return { assessedValue, marketValue: marketPrice };
  }

  async updateYield(id: string): Promise<Property> {
    const property = await this.findOne(id);
    
    // Buscar yield atual via Oracle
    const currentYield = await this.oraclesService.getPropertyYield(id);
    
    property.yieldAnnual = currentYield;
    return this.propertiesRepository.save(property);
  }
}
