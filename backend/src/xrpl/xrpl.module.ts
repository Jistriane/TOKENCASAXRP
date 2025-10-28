import { Module, Global } from '@nestjs/common';
import { XRPLService } from './xrpl.service';
import { HooksService } from './hooks.service';
import { EscrowModule } from '../escrow/escrow.module';
import { NotificationsModule } from '../notifications/notifications.module';

@Global()
@Module({
  imports: [EscrowModule, NotificationsModule],
  providers: [XRPLService, HooksService],
  exports: [XRPLService, HooksService],
})
export class XRPLModule {}

