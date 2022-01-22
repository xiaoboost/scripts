import { PageData } from './page';
import { parseDataSize } from '../data';

import {
  GalleryImageData,
  ImageInfo,
  IdName,
} from './utils';

function parseWidthHeight(str: string) {
  const [width, height] = str.split('x').map((num) => Number.parseInt(num.trim()));
  if (!Number.isNaN(width) && !Number.isNaN(height)) {
    return { width, height };
  }
}

function parsePrieviewInfo(text: string): ImageInfo {
  const [nameText, sizeText, dataSizeText] = text.split('::').map((t) => t.trim());
  const size = parseWidthHeight(sizeText);

  if (!size) {
    throw new Error('解析预览图片宽高时出错');
  }

  const dataSize = parseDataSize(dataSizeText);

  if (dataSize === -1) {
    throw new Error('解析预览图片文件大小时出错');
  }

  return {
    // 预览图这里是图片名称，使用 url 字段替代一下
    url: nameText,
    dataSize,
    size,
  };
}

function parseOriginInfo(text: string): ImageInfo {
  const sizeMatch = /\d+ ?x ?\d+/.exec(text);
  const size = parseWidthHeight(sizeMatch?.[0] ?? '');

  if (!size) {
    throw new Error('解析原始图片宽高时出错');
  }

  const dataSizeMatch = /\d+(\.\d+)? ?[KMG]B/i.exec(text);
  const dataSize = parseDataSize(dataSizeMatch?.[0] ?? '');

  if (!dataSize) {
    throw new Error('解析原始图片文件大小时出错');
  }

  return {
    // 原始图片文本中不包含名称
    url: '',
    dataSize,
    size,
  };
}

/** 画廊图片类 */
export class HentaiImage extends PageData {
  /** 图片编号 */
  index = 0;
  /** 图片数据 */
  data?: GalleryImageData;

  constructor(url: string, doc?: Document) {
    super(url, doc);
    this.getIndex();
  }

  /** 获取图片编号 */
  getIndex() {
    const indexMatch = /-(\d+)$/.exec(this.url);
    const imageIndex = indexMatch ? Number.parseInt(indexMatch[1]) : 0;
    this.index = imageIndex;
    return imageIndex;
  }

  /** 获取图片数据 */
  async getImageData(): Promise<GalleryImageData> {
    if (this.data) {
      return this.data;
    }

    const doc = await this.getDocument();
    const previewInfoDom = doc.querySelector(`#${IdName.ImagePreviewInfo}`)?.children[1];
    const previewInfo = parsePrieviewInfo(previewInfoDom?.textContent ?? '');
    const previewDom = doc.querySelector(`#${IdName.ImagePreview}`);
    const previewUrl = previewDom?.getAttribute('src');
    const originDom = doc.querySelector(`#${IdName.ImageOriginInfo} a`);
    const originData = originDom
      ? {
        ...parseOriginInfo(originDom.textContent ?? ''),
        url: originDom.getAttribute('href') ?? '',
      }
      : undefined;

    // TODO: 509 错误码，流量被限制错误

    if (!previewUrl) {
      throw new Error('获取预览图片链接出错');
    }

    this.data = {
      name: previewInfo.url,
      index: this.index === 0 ? this.getIndex() : this.index,
      priview: {
        url: previewUrl,
        size: previewInfo.size,
        dataSize: previewInfo.dataSize,
      },
      origin: originData,
    };

    return this.data;
  }
}
