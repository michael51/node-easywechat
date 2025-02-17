'use strict';
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Utils_1 = require("./Core/Utils");
const Application_1 = __importDefault(require("./OfficialAccount/Application"));
const Application_2 = __importDefault(require("./BaseService/Application"));
const Application_3 = __importDefault(require("./MiniProgram/Application"));
const Application_4 = __importDefault(require("./OpenPlatform/Application"));
const Application_5 = __importDefault(require("./OpenWork/Application"));
const Application_6 = __importDefault(require("./Payment/Application"));
const Application_7 = __importDefault(require("./Work/Application"));
const Application_8 = __importDefault(require("./MicroMerchant/Application"));
const CacheInterface_1 = __importDefault(require("./Core/Contracts/CacheInterface"));
const FinallResult_1 = __importDefault(require("./Core/Decorators/FinallResult"));
const TerminateResult_1 = __importDefault(require("./Core/Decorators/TerminateResult"));
const Request_1 = __importDefault(require("./Core/Http/Request"));
const Response_1 = __importDefault(require("./Core/Http/Response"));
const StreamResponse_1 = __importDefault(require("./Core/Http/StreamResponse"));
const Messages = __importStar(require("./Core/Messages"));
function getInstance(service, config) {
    try {
        let s = (0, Utils_1.strStudly)(service);
        let applicationClass = this[s];
        return new applicationClass(config);
    }
    catch (e) {
        console.log(e);
    }
}
;
class EasyWechat {
    constructor() {
        /**
         * 声明配置项
         * @param config
         * @returns
         */
        this.defineConfig = function (config) {
            return config;
        };
        this.Factory = {
            OfficialAccount: Application_1.default,
            BaseService: Application_2.default,
            MiniProgram: Application_3.default,
            OpenPlatform: Application_4.default,
            OpenWork: Application_5.default,
            Payment: Application_6.default,
            Work: Application_7.default,
            MicroMerchant: Application_8.default,
            getInstance: getInstance,
        };
        this.CacheInterface = CacheInterface_1.default;
        this.Decorator = {
            FinallResult: FinallResult_1.default,
            TerminateResult: TerminateResult_1.default,
        };
        this.Http = {
            Request: Request_1.default,
            Response: Response_1.default,
            StreamResponse: StreamResponse_1.default,
        };
        this.Messages = Messages;
    }
}
;
module.exports = new EasyWechat;
