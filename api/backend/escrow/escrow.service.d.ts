export declare class EscrowService {
    distribute(distributionData: any): Promise<{
        success: boolean;
        propertyId: any;
        totalRent: any;
        rentPerToken: number;
        distributions: any;
    }>;
    getHistory(): Promise<any[]>;
}
