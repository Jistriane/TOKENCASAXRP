export declare class Property {
    id: string;
    title: string;
    address: string;
    city: string;
    state: string;
    totalPrice: number;
    totalTokens: number;
    pricePerToken: number;
    yieldAnnual: number;
    type: string;
    area: number;
    description: string;
    images: string[];
    documents: {
        matricula?: string;
        iptu?: string;
        contrato?: string;
        laudo?: string;
    };
    ipfsMetadataHash: string;
    mptId: string;
    ownerAddress: string;
    tokenized: boolean;
    tokensSold: number;
    rentalHistory: Array<{
        month: string;
        amount: number;
        distributed: boolean;
    }>;
    createdAt: Date;
    updatedAt: Date;
}
