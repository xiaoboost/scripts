import { parseFromString } from './dom';
import { ClassName, IdName } from './constant';
import { fetch } from "@scripts/utils";
import { isString, isDef, delay } from '@xiao-ai/utils';

type ImageData =
  | {
    error: ErrorCode;
  }
  | {
    name: string;
    previewUrl: string;
    originUrl?: string;
  };

/** 错误码 */
export enum ErrorCode {
  /** 获取预览页面 */
  GetPreviewPage,
  /** 获取图片名称 */
  GetImageName,
  /** 获取图片链接 */
  GetImageUrl,
  /** 下载图片 */
  DownloadImage,
}

/** 错误码对应文本 */
export const ErrorText = {
  [ErrorCode.GetPreviewPage]: '获取预览页面时出错',
  [ErrorCode.GetImageName]: '解析图片名称时出错',
  [ErrorCode.GetImageUrl]: '解析图片下载链接时出错',
  [ErrorCode.DownloadImage]: '下载图片时出错',
};

/** 是否是搜索页面 */
export function isSearchPage() {
  return Boolean(document.querySelector(`#${IdName.SearchOption}`));
}

/** 是否是画廊页面 */
export function isGalleryPage() {
  return Boolean(document.querySelector(`#${IdName.GalleryInfo}`));
}

/** 收集所有预览页网址 */
export function getAllPagesUrl() {
  const baseUrl = `${location.origin}${location.pathname}`;
  const pageListDom = Array.from(document.querySelectorAll(`.${ClassName.PageList} tr td a[href]`));
  const maxPageNumber = Math.max(...pageListDom
    .map((el) => Number.parseInt(el.textContent ?? ''))
    .filter((n) => !Number.isNaN(n))
  );

  return Array(maxPageNumber).fill(0).map((_, index) => {
    return index === 0
      ? baseUrl
      : `${baseUrl}?p=${index}`;
  });
}

/** 获取当前画廊的图片预览网址 */
export async function *getImagePreviewUrls(url: string | string[]) {
  const urls = isString(url) ? [url] : url;
  const imageUrls: string[] = [];

  function getImageUrlsFromDocument(document: Document) {
    const selector = `#${IdName.ImageListBox} .${ClassName.ImageBox} a`;
    const elements = Array.from(document.querySelectorAll(selector));
    const urls = elements
      .map((item) => item.getAttribute('href'))
      .filter(isDef)
      .filter((item) => item.length > 0);

    return urls;
  }

  for (const link of urls) {
    const html = await fetch(link).then((data) => data.text()).catch(() => {
      // TODO: 错误处理
      return void 0;
    });

    if (!html) {
      continue;
    }

    const newDocument = parseFromString(html);
    const imageElements = getImageUrlsFromDocument(newDocument);

    imageUrls.push(...imageElements);

    yield [...imageUrls];

    await delay(500);
  }

  return imageUrls;
}

/** 获取当前画廊标题 */
export function getGalleryTitle(doc: Document) {
  const japanTitle = doc.querySelector(`#${IdName.TitleJapan}`);
  const translatedTitle = doc.querySelector(`#${IdName.TitleTranslated}`);
  const japanText = japanTitle?.textContent ?? '';
  const translatedText = translatedTitle?.textContent ?? '';

  return japanText.length > 0 ? japanText : translatedText;
}

/** 解析所有预览页面 */
export async function getImageUrlFromPreview(url: string): Promise<ImageData> {
  const preview = await fetch(url).then((data) => data.text()).catch((e) => {
    console.warn(e);
  });

  if (!preview) {
    return {
      error: ErrorCode.GetPreviewPage,
    };
  }

  function getImageName(info: string) {
    return info.split('::')[0]?.trim() ?? '';
  }

  const document = parseFromString(preview);
  const infoDom = document.querySelector(`#${IdName.ImagePreviewInfo}`)?.children[1];
  const imageName = getImageName(infoDom?.textContent ?? '');

  if (!imageName) {
    return {
      error: ErrorCode.GetImageName,
    };
  }

  const previewDom = document.querySelector(`#${IdName.ImagePreview}`);
  const previewUrl = previewDom?.getAttribute('src');
  const originDom = document.querySelector(`#${IdName.ImageOrigin} a`);
  const originUrl = originDom?.getAttribute('href') ?? undefined;

  if (!previewUrl && !originUrl) {
    return {
      error: ErrorCode.GetImageUrl,
    };
  }

  return {
    name: imageName,
    previewUrl: previewUrl!,
    originUrl,
  };
}
