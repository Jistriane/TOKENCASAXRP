import { Controller, Get, Post, Body } from '@nestjs/common';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get()
  findAll() {
    return this.transactionsService.findAll();
  }

  @Post()
  create(@Body() transactionData: any) {
    return this.transactionsService.create(transactionData);
  }
}

