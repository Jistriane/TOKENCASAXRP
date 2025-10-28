"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OraclesModule = void 0;
const common_1 = require("@nestjs/common");
const oracles_service_1 = require("./oracles.service");
let OraclesModule = class OraclesModule {
};
exports.OraclesModule = OraclesModule;
exports.OraclesModule = OraclesModule = __decorate([
    (0, common_1.Module)({
        providers: [oracles_service_1.OraclesService],
        exports: [oracles_service_1.OraclesService],
    })
], OraclesModule);
//# sourceMappingURL=oracles.module.js.map