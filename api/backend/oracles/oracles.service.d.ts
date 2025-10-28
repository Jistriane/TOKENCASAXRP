export declare class OraclesService {
    private chainlinkUrl;
    getPropertyPrice(propertyAddress: string): Promise<number>;
    getAssessedValue(propertyAddress: string): Promise<number>;
    verifyRentPayment(propertyId: string, expectedAmount: number): Promise<boolean>;
    getPropertyYield(propertyId: string): Promise<number>;
    private generateMockPrice;
    private estimatePropertyValue;
    private getMonthlyRent;
}
