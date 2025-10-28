import { PropertiesService } from './properties.service';
import { CreatePropertyDto } from './dto/create-property.dto';
export declare class PropertiesController {
    private readonly propertiesService;
    constructor(propertiesService: PropertiesService);
    findAll(): Promise<import("./entities/property.entity").Property[]>;
    findOne(id: string): Promise<import("./entities/property.entity").Property>;
    create(createPropertyDto: CreatePropertyDto): Promise<import("./entities/property.entity").Property>;
    tokenize(id: string): Promise<any>;
}
