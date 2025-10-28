import { XRPLService } from './xrpl.service';
import { EscrowService } from '../escrow/escrow.service';
import { NotificationsService } from '../notifications/notifications.service';
export declare class HooksService {
    private xrplService;
    private escrowService;
    private notificationsService;
    constructor(xrplService: XRPLService, escrowService: EscrowService, notificationsService: NotificationsService);
    validatePurchase(address: string, mptId: string): Promise<boolean>;
    onRentAvailable(propertyId: string, rentAmount: number): Promise<void>;
    validateTransfer(from: string, to: string, mptId: string, amount: number): Promise<boolean>;
    onCreateEscrow(propertyId: string, amount: number, releaseDate: Date): Promise<string>;
    onEscrowRelease(escrowId: string): Promise<void>;
    private getPropertyHolders;
    private getTotalTokens;
    private hasCredential;
}
