import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropertiesModule } from './properties/properties.module';
import { UsersModule } from './users/users.module';
import { TransactionsModule } from './transactions/transactions.module';
import { EscrowModule } from './escrow/escrow.module';
import { XRPLModule } from './xrpl/xrpl.module';
import { IPFSModule } from './ipfs/ipfs.module';
import { NotificationsModule } from './notifications/notifications.module';
import { OraclesModule } from './oracles/oracles.module';
import { AuthModule } from './auth/auth.module';
import { CVMModule } from './compliance/cvm.module';
import { RentalModule } from './rental/rental.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 5432,
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'tokencasa',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: process.env.NODE_ENV !== 'production',
    }),
    PropertiesModule,
    UsersModule,
    TransactionsModule,
    EscrowModule,
    XRPLModule,
    IPFSModule,
    NotificationsModule,
    OraclesModule,
    AuthModule,
    CVMModule,
    RentalModule,
    // PushModule, // Temporariamente desabilitado
  ],
})
export class AppModule {}
