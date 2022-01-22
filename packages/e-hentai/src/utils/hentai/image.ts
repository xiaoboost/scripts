import { PageData } from './page';
import { parseDataSize } from '../data';

import {
  GalleryImageData,
  ImageInfo,
  Result,
  NoError,
  IdName,
} from './utils';

function parseWidthHeight(str: string) {
  const [width, height] = str.split('x').map((num) => Number.parseInt(num.trim()));
  if (!Number.isNaN(width) && !Number.isNaN(height)) {
    return { width, height };
  }
}

function parsePrieviewInfo(text: string): Result<ImageInfo> {
  const [nameText, sizeText, dataSizeText] = text.split('::').map((t) => t.trim());
  const size = parseWidthHeight(sizeText);

  if (!size) {
    return { message: '解析预览图片宽高时出错' };
  }

  const dataSize = parseDataSize(dataSizeText);

  if (dataSize === -1) {
    return { message: '解析预览图片文件大小时出错' };
  }

  return {
    message: NoError,
    data: {
      // 预览图这里是图片名称，使用 url 字段替代一下
      url: nameText,
      dataSize,
      size,
    },
  };
}

function parseOriginInfo(text: string): Result<ImageInfo> {
  const sizeMatch = /\d+ ?x ?\d+/.exec(text);
  const size = parseWidthHeight(sizeMatch?.[0] ?? '');

  if (!size) {
    return { message: '解析原始图片宽高时出错' };
  }

  const dataSizeMatch = /\d+(\.\d+)? ?[KMG]B/i.exec(text);
  const dataSize = parseDataSize(dataSizeMatch?.[0] ?? '');

  if (!dataSize) {
    return { message: '解析原始图片文件大小时出错' };
  }

  return {
    message: NoError,
    data: {
      // 原始图片文本中不包含名称
      url: '',
      dataSize,
      size,
    },
  };
}

/** 画廊图片类 */
export class HentaiImage extends PageData {
  /** 图片数据 */
  data?: GalleryImageData;

  constructor(url: string, doc?: Document) {
    super(url, doc);
  }

  /** 获取图片数据 */
  async getImageData(): Promise<Result<GalleryImageData>> {
    if (this.data) {
      return {
        data: this.data,
        message: NoError,
      };
    }

    const { data: doc, message } = await this.getDocument();

    if (!doc) {
      return { message };
    }

    const previewInfoDom = doc.querySelector(`#${IdName.ImagePreviewInfo}`)?.children[1];
    const previewInfo = parsePrieviewInfo(previewInfoDom?.textContent ?? '');

    if (!previewInfo.data) {
      return { message: previewInfo.message };
    }

    const originInfoDom = doc.querySelector(`#${IdName.ImageOriginInfo}`)?.children[1];
    const originInfo = parseOriginInfo(originInfoDom?.textContent ?? '');
    const previewDom = doc.querySelector(`#${IdName.ImagePreview}`);
    const previewUrl = previewDom?.getAttribute('src');
    const originDom = doc.querySelector(`#${IdName.ImageOrigin} a`);
    const originUrl = originDom?.getAttribute('href') ?? undefined;

    // TODO: 509 错误码，流量被限制错误

    if (!previewUrl) {
      return {
        message: '获取预览图片链接出错',
      };
    }

    return {
      message: NoError,
      data: {
        name: previewInfo.data.url,
        priview: {
          url: previewUrl,
          size: previewInfo.data.size,
          dataSize: previewInfo.data.dataSize,
        },
        origin: originUrl && originInfo.data
          ? {
            url: originUrl,
            size: originInfo.data.size,
            dataSize: originInfo.data.dataSize,
          }
          : undefined,
      },
    };
  }
}
