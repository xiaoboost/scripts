import { parseFromString } from '../dom';
import { Result, NoError } from './utils';
import { fetch } from "@scripts/utils";

/** 网页基础类 */
export abstract class PageData {
  /** 网页链接 */
  private url: string;
  /** 网页 DOM */
  private doc?: Document;

  constructor(url: string, doc?: Document) {
    this.url = url;
    this.doc = doc;
  }

  /** 获取网页 DOM */
  async getDocument(): Promise<Result<Document>> {
    try {
      if (this.doc) {
        return {
          data: this.doc,
          message: NoError,
        };
      }
      else {
        const page = await fetch(this.url);
        const html = await page.text();
        this.doc = parseFromString(html);
        return {
          data: this.doc,
          message: NoError,
        };
      }
    }
    catch (e) {
      console.warn(e);
      return {
        data: this.doc,
        message: '获取网页数据时发生错误',
        extra: this.url,
      };
    }
  }
}
