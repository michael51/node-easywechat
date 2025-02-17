import BaseClient from '../../Core/BaseClient';
export default class Client extends BaseClient {
    protected url: string;
    protected ticketEndpoint: string;
    /**
     * 获取签名凭证api_ticket
     * @param refresh 是否强制刷新
     * @param type 类型，默认：jsapi
     */
    getTicket(refresh?: boolean, type?: string): Promise<string>;
    /**
     * 获取JSSDK的配置
     * @param jsApiList API列表
     * @param debug 是否调试模式，默认：false
     * @param beta 是否测试模式，默认：false
     * @param json true时返回JSON字符串，默认：true
     * @param openTagList 开放标签列表，默认：[]
     * @param url 请求URL，默认：当前URL
     */
    buildConfig(jsApiList: Array<string>, debug?: Boolean, beta?: Boolean, json?: Boolean, openTagList?: Array<string>, url?: string): Promise<any>;
    /**
     * 获取JSSDK的配置对象
     * @param jsApiList API列表
     * @param debug 是否调试模式，默认：false
     * @param beta 是否测试模式，默认：false
     * @param openTagList 开放标签列表，默认：[]
     * @param url 请求URL，默认：当前URL
     */
    getConfigArray(jsApiList: Array<string>, debug?: Boolean, beta?: Boolean, openTagList?: Array<string>, url?: string): Promise<any>;
    /**
     * 获取签名配置
     * @param url 完整的URL地址
     * @param nonce 随机字符串，默认：随机10位
     * @param timestamp 时间戳，默认：当前时间
     */
    configSignature(url?: string, nonce?: string, timestamp?: string): Promise<object>;
    protected getTicketSignature(ticket: string, nonce: string, timestamp: string, url: string): string;
    protected dictionaryOrderSignature(args: Array<string>): string;
    /**
     * 设置当前URL
     * @param url 完整的URL地址
     */
    setUrl(url: string): this;
    /**
     * 获取当前设置的URL
     */
    getUrl(): string;
    /**
     * 获取配置中的app_id
     */
    getAppId(): string;
}
