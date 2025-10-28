import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(): Promise<import("./entities/user.entity").User[]>;
    verifyKYC(kycData: any): Promise<{
        verified: boolean;
        credential: string;
        address: string;
        user: import("./entities/user.entity").User;
        timestamp: Date;
    }>;
}
