export declare class Transaction {
    id: string;
    hash: string;
    type: string;
    propertyId: string;
    fromAddress: string;
    toAddress: string;
    tokens: number;
    value: number;
    pricePerToken: number;
    status: string;
    metadata: any;
    timestamp: Date;
}
