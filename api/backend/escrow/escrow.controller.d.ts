import { EscrowService } from './escrow.service';
export declare class EscrowController {
    private readonly escrowService;
    constructor(escrowService: EscrowService);
    distribute(distributionData: any): Promise<{
        success: boolean;
        propertyId: any;
        totalRent: any;
        rentPerToken: number;
        distributions: any;
    }>;
    getHistory(): Promise<any[]>;
}
