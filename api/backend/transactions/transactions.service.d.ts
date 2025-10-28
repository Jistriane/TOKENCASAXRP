import { Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';
export declare class TransactionsService {
    private transactionsRepository;
    constructor(transactionsRepository: Repository<Transaction>);
    findAll(): Promise<Transaction[]>;
    findByAddress(address: string): Promise<Transaction[]>;
    findByProperty(propertyId: string): Promise<Transaction[]>;
    create(transactionData: Partial<Transaction>): Promise<{
        success: boolean;
        transaction: Transaction;
    }>;
    findOne(id: string): Promise<Transaction>;
}
