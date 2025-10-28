export declare class User {
    address: string;
    email: string;
    kycVerified: boolean;
    credentialId: string;
    kycData: {
        name?: string;
        document?: string;
        verifiedAt?: Date;
    };
    createdAt: Date;
}
