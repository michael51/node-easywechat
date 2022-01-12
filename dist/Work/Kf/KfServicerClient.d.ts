import BaseClient from '../../Core/BaseClient';
export default class KfServicerClient extends BaseClient {
    /**
     * 添加接待人员
     * @see https://open.work.weixin.qq.com/api/doc/90000/90135/94646
     * @param openKfId
     * @param userIds
     * @returns
     */
    add(openKfId: string, userIds: string[]): Promise<any>;
    /**
     * 删除接待人员
     * @see https://open.work.weixin.qq.com/api/doc/90000/90135/94647
     * @param openKfId
     * @param userIds
     * @returns
     */
    del(openKfId: string, userIds: string[]): Promise<any>;
    /**
     * 获取接待人员列表
     * @see https://open.work.weixin.qq.com/api/doc/90000/90135/94645
     * @param openKfId
     * @returns
     */
    list(openKfId: string): Promise<any>;
}
