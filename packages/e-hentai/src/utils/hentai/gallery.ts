import { parseFromString } from '../dom';
import { fetch } from "@scripts/utils";

import {
  ClassName,
  IdName,
  Result,
  NoError,
  GalleryTitle,
} from './utils';

export interface HentaiGalleryTitle {
  title: string;
  subtitle: string;
}

/** 画廊类 */
export class HentaiGallery {
  /** 画廊链接 */
  private url: string;
  /** 画廊 DOM */
  private doc?: Document;

  constructor(url: string, doc?: Document) {
    this.url = url;
    this.doc = doc;
  }

  /** 获取画廊 DOM */
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
        message: '获取画廊网页数据时发生错误',
      };
    }
  }

  /** 获取画廊标题 */
  async getTitle(): Promise<Result<GalleryTitle>> {
    const { data: doc, message } = await this.getDocument();

    if (!doc) {
      return { message };
    }

    const mainTitle = doc.querySelector(`#${IdName.GalleryMainTitle}`);
    const subTitle = doc.querySelector(`#${IdName.GallerySubTitle}`);

    return {
      message: NoError,
      data: {
        title: mainTitle?.textContent ?? '',
        subtitle: subTitle?.textContent ?? '',
      },
    };
  }

  /**
   * 获取画廊文件大小
   *  - 单位：`KB`
   */
  async getSize(): Promise<Result<number>> {
    const { data: doc, message } = await this.getDocument();

    if (!doc) {
      return { message };
    }

    const errorText = '获取画廊大小时出错';
    const tableEls = Array.from(doc.querySelectorAll(`
      #${IdName.GalleryInfo} .${ClassName.GalleryInfoTableName},
      #${IdName.GalleryInfo} .${ClassName.GalleryInfoTableValue}
    `));

    for (let i = 0; i < tableEls.length; i++) {
      const text = tableEls[i].textContent;

      if (text !== 'File Size:') {
        continue;
      }

      const sizeText = tableEls[i + 1]?.textContent;

      if (!sizeText) {
        return { message: errorText };
      }

      /** 单位转换系数 */
      const unitRadio = {
        gb: 1024 * 1024,
        mb: 1024,
        kb: 1,
      };

      const [num, unit] = sizeText.split(/ +/);
      const sizeNumber = Number.parseFloat(num);
      const unitNumber = unitRadio[unit.toLowerCase()];

      return {
        data: sizeNumber * unitNumber,
        message: NoError,
      };
    }

    return { message: errorText };
  }

  // /** 获取所有图片预览网址 */
  // async * getImageUrls() {
  //   const { data: doc, message } = await this.getDocument();

  //   if (!doc) {
  //     return { message };
  //   }
  // }

  /**
   * 获取画廊种子文件
   *  - 拥有多个种子时，会按照大小最接近画廊，和时间最新的原则进行挑选
   */
  async getTorrent(): Promise<Result<void>> {
    const { data: doc, message } = await this.getDocument();

    if (!doc) {
      return { message };
    }

    const actionEls = Array.from(doc.querySelectorAll(
      `#${IdName.RightAside} .${ClassName.RightAsideItem} a`
    ));
    const torrentEl = actionEls.find((el) => el.textContent?.includes('Torrent Download'));

    if (!torrentEl) {
      return { message: '未发现种子下载按钮' };
    }

    const btnText = torrentEl.textContent ?? '';

    if (btnText.endsWith('(0)')) {
      return { message: '没有种子文件' };
    }

    const btnOnClickCode = torrentEl.getAttribute('onclick');
    const torrentListUrl = /popUp\('([^']+?)'/.exec(btnOnClickCode ?? '');

    if (!torrentListUrl || !torrentListUrl[1]) {
      return { message: '解析种子列表页链接出错' };
    }

    const listPageCode = await fetch(torrentListUrl[1])
      .then((data) => data.text())
      .catch((e) => console.warn(e));

    if (!listPageCode) {
      return { message: '获取种子列表页源码出错' };
    }

    const listPageDoc = parseFromString(listPageCode);
    const torrentEls = Array.from(listPageDoc.querySelectorAll('form')).map((formEl) => {
      const infoELs = formEl.querySelectorAll('table td');
      // TODO: 解析列表页
    });

    return {
      message: '未知错误',
    };
  }
}
