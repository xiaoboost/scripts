import { parseFromString } from '../dom';
import { fetch } from "@scripts/utils";

/** 网页基础类 */
export abstract class PageData {
  /** 网页链接 */
  url: string;
  /** 网页 DOM */
  doc?: Document;

  constructor(url: string, doc?: Document) {
    this.url = url;
    this.doc = doc;
  }

  /** 获取网页 DOM */
  async getDocument(): Promise<Document> {
    try {
      if (this.doc) {
        return this.doc;
      }
      else {
        const page = await fetch(this.url);
        const html = await page.text();
        this.doc = parseFromString(html);
        return this.doc;
      }
    }
    catch (e) {
      console.warn(e);
      const err = new Error('获取网页数据时发生错误');
      err.stack = this.url;
      throw err;
    }
  }
}
