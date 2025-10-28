import { Controller, Post, Body } from '@nestjs/common';
import { PushService } from './push.service';

@Controller('push')
export class PushController {
  constructor(private readonly pushService: PushService) {}

  @Post('subscribe')
  async subscribe(@Body() subscriptionData: any) {
    return this.pushService.subscribe(subscriptionData, 'user_mock');
  }

  @Post('send')
  async send(@Body() notificationData: any) {
    return this.pushService.sendNotification({}, notificationData);
  }
}
