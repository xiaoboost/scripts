import { parseFromString } from '../dom';
import { parseDataSize } from '../data';
import { PageData } from './page';
import { HentaiImage } from './image';
import { fetch, log } from "@scripts/utils";
import { isDef, delay } from '@xiao-ai/utils';

import {
  IdName,
  ClassName,
  GalleryTitle,
  GalleryTorrent,
} from './utils';

/** 画廊类 */
export class HentaiGallery extends PageData {
  /** 所有分页网址 */
  private _pageUrls: string[] = [];
  /** 所有图片 */
  private _images: HentaiImage[] = [];

  constructor(url: string, doc?: Document) {
    super(url, doc);
  }

  get images() {
    return this._images.slice();
  }

  /** 获取画廊标题 */
  async getTitle(): Promise<string> {
    const doc = await this.getDocument();
    const mainTitleEl = doc.querySelector(`#${IdName.GalleryMainTitle}`);
    const subtitleEl = doc.querySelector(`#${IdName.GallerySubTitle}`);
    const title = mainTitleEl?.textContent ?? '';
    const subtitle = subtitleEl?.textContent ?? '';

    if (!title && !subtitle) {
      throw new Error('获取画廊标题出错');
    }

    return title.length > 0 ? title : subtitle;
  }

  /**
   * 获取画廊文件大小
   *  - 单位：`KB`
   */
  async getSize(): Promise<number> {
    const doc = await this.getDocument();
    const error = new Error('获取画廊大小时出错');
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
        throw error;
      }

      const size = parseDataSize(sizeText);

      if (size === -1) {
        throw error;
      }

      return size;
    }

    throw error;
  }

  /** 获取所有分页网址 */
  async getPageUrls(): Promise<string[]> {
    if (this._pageUrls.length > 0) {
      return this._pageUrls.slice();
    }

    const doc = await this.getDocument();
    const baseUrl = `${location.origin}${location.pathname}`;
    const pageListDom = Array.from(doc.querySelectorAll(
      `.${ClassName.PageList} tr td a[href]`
    ));
    const maxPageNumber = Math.max(...pageListDom
      .map((el) => Number.parseInt(el.textContent ?? ''))
      .filter((n) => !Number.isNaN(n))
    );

    this._pageUrls = Array(maxPageNumber).fill(0).map((_, index) => {
      return index === 0
        ? baseUrl
        : `${baseUrl}?p=${index}`;
    });

    return this._pageUrls.slice();
  }

  /** 获取所有图片 */
  async *getImages(): AsyncGenerator<HentaiImage[], HentaiImage[]> {
    const pageUrls = await this.getPageUrls();

    for (let i = 0; i < pageUrls.length; i++) {
      const html = await fetch(pageUrls[i])
        .then((data) => data.text())
        .catch((e) => console.warn(e));

      if (!html) {
        if (GlobalEnv.node === 'development') {
          log(`获取第 ${i + 1} 页预览页网页源码时出错，跳过。`);
        }

        continue;
      }

      const newDocument = parseFromString(html);
      const imageSelector = `#${IdName.ImageListBox} .${ClassName.ImageBox} a`;
      const imageElements = Array.from(newDocument.querySelectorAll(imageSelector));
      const imageUrls = imageElements
        .map((item) => item.getAttribute('href'))
        .filter((item) => isDef(item) && item.length > 0)
        .map((url) => new HentaiImage(url!));

      this._images = this.images
        .concat(imageUrls)
        .sort((pre, next) => pre.index > next.index ? 1 : -1);

      yield this._images.slice();

      await delay(500);
    }

    return this.images;
  }

  /**
   * 获取画廊种子文件
   *  - 拥有多个种子时，先按照大小选择，和画廊有5%差距中还有多个时，再按照时间选择最新上传的
   */
  async getTorrent(): Promise<GalleryTorrent> {
    const doc = await this.getDocument();
    const actionEls = Array.from(doc.querySelectorAll(
      `#${IdName.RightAside} .${ClassName.RightAsideItem} a`
    ));
    const torrentEl = actionEls.find((el) => el.textContent?.includes('Torrent Download'));

    if (!torrentEl) {
      throw new Error('未发现种子下载按钮');
    }

    const btnText = torrentEl.textContent ?? '';

    if (btnText.endsWith('(0)')) {
      throw new Error('没有种子文件');
    }

    const btnOnClickCode = torrentEl.getAttribute('onclick');
    const torrentListUrl = /popUp\('([^']+?)'/.exec(btnOnClickCode ?? '');

    if (!torrentListUrl || !torrentListUrl[1]) {
      throw new Error('解析种子列表页链接出错');
    }

    const listPageCode = await fetch(torrentListUrl[1])
      .then((data) => data.text())
      .catch((e) => console.warn(e));

    if (!listPageCode) {
      throw new Error('获取种子列表页源码出错');
    }

    const gallerySize = await this.getSize();
    const listPageDoc = parseFromString(listPageCode);
    const torrents = Array.from(listPageDoc.querySelectorAll('form'))
      .map((formEl) => {
        const infoELs = formEl.querySelectorAll('table td');
        const textContents = Array.from(infoELs).map((item) => item.textContent ?? '');

        // 解析上传日期
        const postedKeyWord = 'Posted:';
        const postedTime = textContents.find((text) => text.startsWith(postedKeyWord));
        const timeString = postedTime?.replace(postedKeyWord, '')?.trim();

        if (!timeString) {
          return;
        }

        const time = new Date(timeString).getTime();

        // 解析文件大小
        const sizeKeyWord = 'Size:';
        const fileSize = textContents.find((text) => text.startsWith(sizeKeyWord));
        const sizeString = fileSize?.replace(sizeKeyWord, '')?.trim();

        if (!sizeString) {
          return;
        }

        const size = parseDataSize(sizeString);

        // 解析下载链接
        const downloadBtnEl = formEl.querySelector('table tr td a[href]');
        const downloadLink = downloadBtnEl?.getAttribute('href');
        const fileName = (downloadBtnEl?.textContent ?? '').trim();

        if (!downloadBtnEl || !downloadLink || !fileName || !fileName.endsWith('.zip')) {
          return;
        }

        return {
          url: downloadLink,
          posted: time,
          size,
        };
      })
      .filter(isDef);

    if (torrents.length === 0) {
      throw new Error('没有种子文件');
    }

    const sizeFiltedTorrents = torrents.filter((item) => {
      // 小于 50MB 时，误差为 0.2
      if (gallerySize < 50 * 1024) {
        return Math.abs(gallerySize - item.size) < 0.2 * gallerySize;
      }
      // 小于 100MB 时，误差为 0.1
      else if (gallerySize < 100 * 1024) {
        return Math.abs(gallerySize - item.size) < 0.1 * gallerySize;
      }
      // 大于 100MB 时，误差为 0.05
      else {
        return Math.abs(gallerySize - item.size) < 0.05 * gallerySize;
      }
    });

    if (sizeFiltedTorrents.length === 0) {
      throw new Error('种子体积和画廊标注不符');
    }

    const torrentSort = sizeFiltedTorrents.sort((pre, next) => pre.size < next.size ? 1 : -1);

    return torrentSort[0];
  }
}
