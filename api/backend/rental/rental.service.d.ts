export declare class RentalService {
    processRentPayment(paymentData: any): Promise<{
        success: boolean;
        rentalPaymentId: string;
        distributed: boolean;
        error?: undefined;
    } | {
        success: boolean;
        error: string;
        rentalPaymentId?: undefined;
        distributed?: undefined;
    }>;
    getRentalHistory(propertyId: string): Promise<{
        date: string;
        amount: number;
        tenants: number;
        status: string;
    }[]>;
    distributeRent(distributionData: any): Promise<{
        success: boolean;
        propertyId: any;
        totalRent: any;
        rentPerToken: number;
        distributions: any;
    }>;
    private validatePayment;
}
