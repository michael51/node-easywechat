'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseClient_1 = __importDefault(require("../../Core/BaseClient"));
class UrlLinkClient extends BaseClient_1.default {
    /**
     * 获取小程序 URL Link
     * @param params
     * @returns
     */
    generate(params = {}) {
        return this.httpPostJson('wxa/generate_urllink', params);
    }
}
exports.default = UrlLinkClient;
