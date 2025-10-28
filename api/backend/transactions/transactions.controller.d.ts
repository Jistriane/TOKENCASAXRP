import { TransactionsService } from './transactions.service';
export declare class TransactionsController {
    private readonly transactionsService;
    constructor(transactionsService: TransactionsService);
    findAll(): Promise<import("./entities/transaction.entity").Transaction[]>;
    create(transactionData: any): Promise<{
        success: boolean;
        transaction: import("./entities/transaction.entity").Transaction;
    }>;
}
