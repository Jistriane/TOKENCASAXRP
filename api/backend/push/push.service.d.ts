export declare class PushService {
    subscribe(subscription: any, userId: string): Promise<boolean>;
    sendNotification(subscription: any, payload: any): Promise<boolean>;
    notifyRentReceived(userId: string, propertyName: string, amount: number): Promise<void>;
    notifyTransaction(userId: string, txType: string, amount: number): Promise<void>;
    private getUserSubscriptions;
}
