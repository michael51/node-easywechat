import Response from './Http/Response';
import BaseApplication from './BaseApplication';
import { Message } from './Messages';
import { ServerHandler, ServerHandlers } from './Types';
export default class ServerGuard {
    static SUCCESS_EMPTY_RESPONSE: string;
    static MESSAGE_TYPE_MAPPING: object;
    protected app: BaseApplication;
    protected alwaysValidate: boolean;
    protected handlers: ServerHandlers;
    constructor(app: BaseApplication);
    /**
     * 注册消息处理器
     * @param condition EasyWechat.Messages.Message.xxx，用于处理特定消息类型，默认：* 表示全部
     * @param handler 处理函数，该函数需要接收一个消息对象
     */
    on(condition: string, handler: ServerHandler): void;
    /**
     * 注册消息处理器
     * @param condition EasyWechat.Messages.Message.xxx，用于处理特定消息类型，默认：* 表示全部
     * @param handler 处理函数，该函数需要接收一个消息对象
     */
    observe(condition: string, handler: ServerHandler): void;
    /**
     * 注册消息处理器
     * @param handler 处理函数，该函数需要接收一个消息对象
     * @param condition EasyWechat.Messages.Message.xxx，用于处理特定消息类型，默认：* 表示全部
     */
    push(handler: ServerHandler, condition?: string): void;
    setHandlers(handlers?: ServerHandlers): void;
    protected dispatch(event: string, payload: any): Promise<any>;
    protected notify(event: string, payload: any): Promise<any>;
    protected _callHandler(handler: ServerHandler, payload: any): Promise<any>;
    /**
     * 处理消息
     */
    serve(): Promise<Response>;
    validate(): Promise<this>;
    forceValidate(): this;
    protected resolve(): Promise<Response>;
    protected shouldReturnRawResponse(): Promise<boolean>;
    protected buildResponse(to: string, from: string, message: any): Promise<string>;
    protected buildReply(to: string, from: string, message: Message): Promise<string>;
    protected getToken(): string;
    protected isSafeMode(): Promise<boolean>;
    protected signature(params: any): string;
    protected handleRequest(): Promise<object>;
    /**
     * 获取消息
     */
    getMessage(): Promise<object>;
    protected parseMessage(content: string): Promise<any>;
    protected decryptMessage(message: object): Promise<string>;
}
