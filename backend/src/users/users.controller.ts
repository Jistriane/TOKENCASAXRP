import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Post('kyc')
  verifyKYC(@Body() kycData: any) {
    return this.usersService.verifyKYC(kycData);
  }
}

