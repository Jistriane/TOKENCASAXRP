import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropertiesController } from './properties.controller';
import { PropertiesService } from './properties.service';
import { Property } from './entities/property.entity';
import { XRPLModule } from '../xrpl/xrpl.module';
import { IPFSModule } from '../ipfs/ipfs.module';
import { OraclesModule } from '../oracles/oracles.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Property]),
    XRPLModule,
    IPFSModule,
    OraclesModule,
  ],
  controllers: [PropertiesController],
  providers: [PropertiesService],
  exports: [PropertiesService],
})
export class PropertiesModule {}

