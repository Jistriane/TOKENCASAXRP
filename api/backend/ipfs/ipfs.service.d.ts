export declare class IPFSService {
    private pinata;
    constructor();
    uploadFile(file: Buffer, fileName: string): Promise<string>;
    uploadMetadata(metadata: any): Promise<string>;
    getFileUrl(hash: string): string;
}
