import { parseFromString } from '../dom';
import { parseDataSize } from '../data';
import { PageData } from './page';
import { HentaiImage } from './image';
import { fetch } from "@scripts/utils";
import { isDef, delay } from '@xiao-ai/utils';

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
export class HentaiGallery extends PageData {
  /** 所有分页网址 */
  private pageUrls: string[] = [];
  /** 所有图片 */
  private images: HentaiImage[] = [];

  constructor(url: string, doc?: Document) {
    super(url, doc);
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

      const size = parseDataSize(sizeText);

      if (size === -1) {
        return { message: '解析画廊大小出错' };
      }

      return {
        data: size,
        message: NoError,
      };
    }

    return { message: errorText };
  }

  /** 获取所有分页网址 */
  async getPageUrls(): Promise<Result<string[]>> {
    if (this.pageUrls) {
      return {
        data: this.pageUrls.slice(),
        message: NoError,
      };
    }

    const { data: doc, message } = await this.getDocument();

    if (!doc) {
      return { message };
    }

    const baseUrl = `${location.origin}${location.pathname}`;
    const pageListDom = Array.from(document.querySelectorAll(
      `.${ClassName.PageList} tr td a[href]`
    ));
    const maxPageNumber = Math.max(...pageListDom
      .map((el) => Number.parseInt(el.textContent ?? ''))
      .filter((n) => !Number.isNaN(n))
    );

    this.pageUrls = Array(maxPageNumber).fill(0).map((_, index) => {
      return index === 0
        ? baseUrl
        : `${baseUrl}?p=${index}`;
    });

    return {
      data: this.pageUrls.slice(),
      message: NoError,
    };
  }

  /** 获取所有图片 */
  async * getImages(): AsyncGenerator<Result<HentaiImage[]>> {
    const { data: pageUrls, message } = await this.getPageUrls();

    if (!pageUrls) {
      return { message };
    }

    for (let i = 0; i < pageUrls.length; i++) {
      const html = await fetch(pageUrls[i])
        .then((data) => data.text())
        .catch((e) => console.warn(e));

      if (!html) {
        yield {
          message: `获取第 ${i + 1} 页预览页网页源码时出错`,
        };
        continue;
      }

      const newDocument = parseFromString(html);
      const imageSelector = `#${IdName.ImageListBox} .${ClassName.ImageBox} a`;
      const imageElements = Array.from(newDocument.querySelectorAll(imageSelector));
      const imageUrls = imageElements
        .map((item) => item.getAttribute('href'))
        .filter((item) => isDef(item) && item.length > 0)
        .map((url) => new HentaiImage(url!));

      this.images.push(...imageUrls);

      yield {
        data: this.images.slice(),
        message: NoError,
      };

      await delay(500);
    }

    return {
      data: this.images.slice(),
      message: NoError,
    };
  }

  /**
   * 获取画廊种子文件
   *  - 拥有多个种子时，先按照大小选择，和画廊有5%差距中还有多个时，再按照时间选择最新上传的
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
