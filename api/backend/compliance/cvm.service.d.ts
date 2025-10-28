export declare class CVMService {
    generateReport(reportData: any): Promise<{
        success: boolean;
        reportId: string;
        reportType: any;
        submittedAt: Date;
    }>;
    getComplianceStatus(): Promise<{
        compliant: boolean;
        lastReport: string;
        nextReportDue: string;
    }>;
}
