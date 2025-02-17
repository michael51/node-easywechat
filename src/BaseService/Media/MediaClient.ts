'use strict';

import BaseClient from '../../Core/BaseClient';
import { inArray } from '../../Core/Utils';
import StreamResponse from '../../Core/Http/StreamResponse';
import Stream from 'stream';

export default class MediaClient extends BaseClient
{
  protected baseUrl: string = 'https://api.weixin.qq.com/cgi-bin/';
  protected allowTypes: Array<string> = ['image', 'voice', 'video', 'thumb'];

  /**
   * 上传图片到临时素材
   * @param file 文件路径或可读stream
   */
  uploadImage(file: string | Stream.Readable): Promise<any>
  {
    return this.upload('image', file);
  }
  /**
   * 上传视频到临时素材
   * @param file 文件路径或可读stream
   */
  uploadVideo(file: string | Stream.Readable): Promise<any>
  {
    return this.upload('video', file);
  }
  /**
   * 上传语音到临时素材
   * @param file 文件路径或可读stream
   */
  uploadVoice(file: string | Stream.Readable): Promise<any>
  {
    return this.upload('voice', file);
  }
  /**
   * 上传缩略图到临时素材
   * @param file 文件路径或可读stream
   */
  uploadThumb(file: string | Stream.Readable): Promise<any>
  {
    return this.upload('thumb', file);
  }

  /**
   * 上传到临时素材
   * @param type 类型，可选值：image,video,voice,thumb
   * @param file 文件路径或可读stream
   */
  upload(type: string, file: string | Stream.Readable): Promise<any>
  {
    if (!file) {
      throw new Error(`File does not exist, or the file is unreadable: '${file}'`);
    }

    if (!inArray(type, this.allowTypes)) {
      throw new Error(`Unsupported media type: '${type}'`);
    }

    return this.httpUpload('media/upload', {
      media: file
    }, {}, {
      type
    });
  }

  /**
   * 上传群发视频
   * @param file 文件路径或可读stream
   * @param title 标题
   * @param description 描述
   */
  async uploadVideoForBroadcasting(file: string | Stream.Readable, title: string, description: string): Promise<any>
  {
    let response = await this.uploadVideo(file);
    if (response['media_id']) {
      return await this.createVideoForBroadcasting(response['media_id'], title, description);
    }
    return response;
  }

  /**
   * 创建群发消息
   * @param media_id 上传视频得到 media_id
   * @param title 标题
   * @param description 描述
   */
  createVideoForBroadcasting(media_id: string, title: string, description: string): Promise<any>
  {
    return this.httpPostJson('media/uploadvideo', {
      media_id,
      title,
      description,
    });
  }

  /**
   * 获取临时素材内容
   * @param media_id 上传视频得到 media_id
   */
  async get(media_id: string): Promise<any>
  {
    let res = await this.requestRaw({
      url: 'media/get',
      method: 'GET',
      params: {
        media_id,
      }
    });

    if (res.getHeader('content-disposition').indexOf('attachment') > -1) {
      return StreamResponse.buildFromResponse(res);
    }

    let content = res.getContent();
    if (typeof content === 'string') {
      try {
        content = JSON.parse(content);
      }
      catch (e) { }
    }
    return content;
  }

  /**
   * 获取 JSSDK 上传的高清语音
   * @param media_id 上传视频得到 media_id
   */
  async getJssdkMedia(media_id: string): Promise<any>
  {
    let res = await this.requestRaw({
      url: 'media/get/jssdk',
      method: 'GET',
      params: {
        media_id,
      }
    });

    if (res.getHeader('content-disposition').indexOf('attachment') > -1) {
      return StreamResponse.buildFromResponse(res);
    }

    let content = res.getContent();
    if (typeof content === 'string') {
      try {
        content = JSON.parse(content);
      }
      catch (e) { }
    }
    return content;
  }

}
