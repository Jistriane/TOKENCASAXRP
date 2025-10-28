import { Module } from '@nestjs/common';
import { CVMController } from './cvm.controller';
import { CVMService } from './cvm.service';

@Module({
  controllers: [CVMController],
  providers: [CVMService],
})
export class CVMModule {}
