import { OnModuleInit } from '@nestjs/common';
export declare class XRPLService implements OnModuleInit {
    private client;
    private network;
    onModuleInit(): Promise<void>;
    createMPT(ownerAddress: string, metadataHash: string, totalSupply: number): Promise<string>;
    createEscrow(propertyId: string, amount: string, condition: string): Promise<string>;
    submitTransaction(tx: any): Promise<string>;
    getAccountInfo(address: string): Promise<{
        account_data: import("xrpl/dist/npm/models/ledger").AccountRoot;
        account_flags?: import("xrpl").AccountInfoAccountFlags;
        ledger_current_index?: number;
        ledger_index?: number;
        queue_data?: import("xrpl").AccountQueueData;
        validated?: boolean;
    } & {
        signer_lists?: import("xrpl/dist/npm/models/ledger").SignerList[];
    }>;
    createOffer(account: string, takerPays: string, takerGets: string): Promise<string>;
}
