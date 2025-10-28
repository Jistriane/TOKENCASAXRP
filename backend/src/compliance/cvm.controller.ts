import { Controller, Post, Get, Body } from '@nestjs/common';
import { CVMService } from './cvm.service';

@Controller('cvm')
export class CVMController {
  constructor(private readonly cvmService: CVMService) {}

  @Post('report')
  async report(@Body() reportData: any) {
    return this.cvmService.generateReport(reportData);
  }

  @Get('compliance')
  async getCompliance() {
    return this.cvmService.getComplianceStatus();
  }
}

