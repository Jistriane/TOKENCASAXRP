import { CVMService } from './cvm.service';
export declare class CVMController {
    private readonly cvmService;
    constructor(cvmService: CVMService);
    report(reportData: any): Promise<{
        success: boolean;
        reportId: string;
        reportType: any;
        submittedAt: Date;
    }>;
    getCompliance(): Promise<{
        compliant: boolean;
        lastReport: string;
        nextReportDue: string;
    }>;
}
