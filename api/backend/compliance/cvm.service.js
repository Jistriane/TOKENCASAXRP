"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CVMService = void 0;
const common_1 = require("@nestjs/common");
let CVMService = class CVMService {
    async generateReport(reportData) {
        console.log('Gerando relatório CVM:', reportData);
        return {
            success: true,
            reportId: 'CVM_' + Date.now(),
            reportType: reportData.type,
            submittedAt: new Date(),
        };
    }
    async getComplianceStatus() {
        return {
            compliant: true,
            lastReport: new Date().toISOString(),
            nextReportDue: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        };
    }
};
exports.CVMService = CVMService;
exports.CVMService = CVMService = __decorate([
    (0, common_1.Injectable)()
], CVMService);
//# sourceMappingURL=cvm.service.js.map