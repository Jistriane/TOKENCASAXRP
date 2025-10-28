import { Module } from '@nestjs/common';
import { OraclesService } from './oracles.service';

@Module({
  providers: [OraclesService],
  exports: [OraclesService],
})
export class OraclesModule {}

