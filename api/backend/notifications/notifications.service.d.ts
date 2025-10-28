export declare class NotificationsService {
    private sendgrid;
    constructor();
    sendEmail(to: string, subject: string, content: string): Promise<{
        success: boolean;
        simulated: boolean;
        error?: undefined;
    } | {
        success: boolean;
        simulated?: undefined;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        simulated?: undefined;
    }>;
    sendRentNotification(to: string, propertyName: string, amount: number): Promise<{
        success: boolean;
        simulated: boolean;
        error?: undefined;
    } | {
        success: boolean;
        simulated?: undefined;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        simulated?: undefined;
    }>;
    sendTransactionNotification(to: string, txType: string, amount: number): Promise<{
        success: boolean;
        simulated: boolean;
        error?: undefined;
    } | {
        success: boolean;
        simulated?: undefined;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        simulated?: undefined;
    }>;
}
