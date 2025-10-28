"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IPFSModule = void 0;
const common_1 = require("@nestjs/common");
const ipfs_service_1 = require("./ipfs.service");
let IPFSModule = class IPFSModule {
};
exports.IPFSModule = IPFSModule;
exports.IPFSModule = IPFSModule = __decorate([
    (0, common_1.Module)({
        providers: [ipfs_service_1.IPFSService],
        exports: [ipfs_service_1.IPFSService],
    })
], IPFSModule);
//# sourceMappingURL=ipfs.module.js.map