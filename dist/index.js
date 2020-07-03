'use strict';
const Utils_1 = require("./Core/Utils");
const Application_1 = require("./OfficialAccount/Application");
const Application_2 = require("./BaseService/Application");
const Application_3 = require("./MiniProgram/Application");
const Application_4 = require("./OpenPlatform/Application");
const Application_5 = require("./Payment/Application");
const CacheInterface_1 = require("./Core/Contracts/CacheInterface");
const FinallResult_1 = require("./Core/Decorators/FinallResult");
const TerminateResult_1 = require("./Core/Decorators/TerminateResult");
const Request_1 = require("./Core/Http/Request");
const Response_1 = require("./Core/Http/Response");
const StreamResponse_1 = require("./Core/Http/StreamResponse");
const Messages = require("./Core/Messages");
const EasyWechat = {
    Factory: {
        OfficialAccount: Application_1.default,
        BaseService: Application_2.default,
        MiniProgram: Application_3.default,
        OpenPlatform: Application_4.default,
        Payment: Application_5.default,
        getInstance: function (service, config = {}) {
            try {
                service = Utils_1.strStudly(service);
                let applicationClass = this[service];
                return new applicationClass(config);
            }
            catch (e) {
                console.log(e);
            }
        },
    },
    CacheInterface: CacheInterface_1.default,
    Decorator: {
        FinallResult: FinallResult_1.default,
        TerminateResult: TerminateResult_1.default,
    },
    Http: {
        Request: Request_1.default,
        Response: Response_1.default,
        StreamResponse: StreamResponse_1.default,
    },
    /**
     * @deprecated 即将作废，请使用 Messages 代替
     */
    Message: Messages,
    Messages,
};
module.exports = EasyWechat;
