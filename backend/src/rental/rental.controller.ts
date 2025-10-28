import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { RentalService } from './rental.service';

@Controller('rental')
export class RentalController {
  constructor(private readonly rentalService: RentalService) {}

  @Post('webhook')
  async receivePayment(@Body() paymentData: any) {
    return this.rentalService.processRentPayment(paymentData);
  }

  @Get('history/:propertyId')
  async getRentalHistory(@Param('propertyId') propertyId: string) {
    return this.rentalService.getRentalHistory(propertyId);
  }

  @Post('distribute')
  async distributeRent(@Body() distributionData: any) {
    return this.rentalService.distributeRent(distributionData);
  }
}
