"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.XRPLModule = void 0;
const common_1 = require("@nestjs/common");
const xrpl_service_1 = require("./xrpl.service");
const hooks_service_1 = require("./hooks.service");
const escrow_module_1 = require("../escrow/escrow.module");
const notifications_module_1 = require("../notifications/notifications.module");
let XRPLModule = class XRPLModule {
};
exports.XRPLModule = XRPLModule;
exports.XRPLModule = XRPLModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [escrow_module_1.EscrowModule, notifications_module_1.NotificationsModule],
        providers: [xrpl_service_1.XRPLService, hooks_service_1.HooksService],
        exports: [xrpl_service_1.XRPLService, hooks_service_1.HooksService],
    })
], XRPLModule);
//# sourceMappingURL=xrpl.module.js.map