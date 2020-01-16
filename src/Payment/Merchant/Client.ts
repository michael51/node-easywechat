'use strict';

import BaseClient from '../Core/BaseClient';
import * as Merge from 'merge';

export default class Client extends BaseClient
{

  addSubMerchant(params: object): Promise<any>
  {
    return this.manage(params, {
      action: 'add',
    });
  }

  querySubMerchantByMerchantId(id: string): Promise<any>
  {
    let params = {
      micro_mch_id: id,
    };
    return this.manage(params, {
      action: 'query',
    });
  }

  querySubMerchantByWeChatId(id: string): Promise<any>
  {
    let params = {
      recipient_wechatid: id,
    };
    return this.manage(params, {
      action: 'query',
    });
  }

  protected manage(params: object, query: object): Promise<any>
  {
    params = Merge({}, params, {
      appid: this.app['config'].app_id,
      nonce_str: '',
      sub_mech_id: '',
      sub_appid: '',
    });

    return this.safeRequest('secapi/mch/submchmanage', params, 'post', {qs: query});
  }

}
