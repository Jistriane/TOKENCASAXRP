import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private transactionsRepository: Repository<Transaction>,
  ) {}

  async findAll() {
    return this.transactionsRepository.find({
      order: { timestamp: 'DESC' },
    });
  }

  async findByAddress(address: string) {
    return this.transactionsRepository.find({
      where: [
        { fromAddress: address },
        { toAddress: address },
      ],
      order: { timestamp: 'DESC' },
    });
  }

  async findByProperty(propertyId: string) {
    return this.transactionsRepository.find({
      where: { propertyId },
      order: { timestamp: 'DESC' },
    });
  }

  async create(transactionData: Partial<Transaction>) {
    const transaction = this.transactionsRepository.create(transactionData);
    const saved = await this.transactionsRepository.save(transaction);
    
    return {
      success: true,
      transaction: saved,
    };
  }

  async findOne(id: string) {
    return this.transactionsRepository.findOne({ where: { id } });
  }
}

