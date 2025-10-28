import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    findAll(): Promise<User[]>;
    findOne(address: string): Promise<User>;
    createOrUpdate(userData: Partial<User>): Promise<User>;
    verifyKYC(kycData: any): Promise<{
        verified: boolean;
        credential: string;
        address: string;
        user: User;
        timestamp: Date;
    }>;
    hasCredential(address: string, credentialId: string): Promise<boolean>;
}
