import { Controller, Get, Post, Body } from '@nestjs/common';
import { EscrowService } from './escrow.service';

@Controller('escrow')
export class EscrowController {
  constructor(private readonly escrowService: EscrowService) {}

  @Post('distribute')
  distribute(@Body() distributionData: any) {
    return this.escrowService.distribute(distributionData);
  }

  @Get('history')
  getHistory() {
    return this.escrowService.getHistory();
  }
}

