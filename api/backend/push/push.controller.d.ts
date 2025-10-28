import { PushService } from './push.service';
export declare class PushController {
    private readonly pushService;
    constructor(pushService: PushService);
    subscribe(subscriptionData: any): Promise<boolean>;
    send(notificationData: any): Promise<boolean>;
}
