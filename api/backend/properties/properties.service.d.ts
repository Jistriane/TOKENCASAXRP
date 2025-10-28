import { Repository } from 'typeorm';
import { Property } from './entities/property.entity';
import { CreatePropertyDto } from './dto/create-property.dto';
import { XRPLService } from '../xrpl/xrpl.service';
import { IPFSService } from '../ipfs/ipfs.service';
import { OraclesService } from '../oracles/oracles.service';
export declare class PropertiesService {
    private propertiesRepository;
    private xrplService;
    private ipfsService;
    private oraclesService;
    constructor(propertiesRepository: Repository<Property>, xrplService: XRPLService, ipfsService: IPFSService, oraclesService: OraclesService);
    findAll(): Promise<Property[]>;
    findOne(id: string): Promise<Property>;
    create(createPropertyDto: CreatePropertyDto): Promise<Property>;
    tokenize(id: string): Promise<any>;
    uploadDocuments(id: string, documents: {
        matricula?: string;
        iptu?: string;
        contrato?: string;
    }): Promise<Property>;
    assessProperty(id: string): Promise<{
        assessedValue: number;
        marketValue: number;
    }>;
    updateYield(id: string): Promise<Property>;
}
