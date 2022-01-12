import axios from 'axios';
import { parseFromString } from './dom';
import { hentaiKind, HentaiKind, ClassName, IdName } from './constant';
import { isString, isDef, delay } from '@xiao-ai/utils';

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

export interface GetImagesUrlOption {
  onProgress?(urls: string[]): void;
}

function getImageUrlsFromDocument(document: Document) {
  const selector = `#${IdName.ImageListBox} .${ClassName.ImageBox} a`;
  const elements = Array.from(document.querySelectorAll(selector));
  const urls = elements
    .map((item) => item.getAttribute('href'))
    .filter(isDef)
    .filter((item) => item.length > 0);

  return urls;
}

/** 收集当前页面的图片预览网址 */
export async function* getImagesUrlInPage(url: string | string[]) {
  const urls = isString(url) ? [url] : url;
  const imageUrls: string[] = [];

  for (const link of urls) {
    const result = await axios.get(link).catch(() => {
      // TODO: 错误处理
      return void 0;
    });

    if (!result) {
      continue;
    }

    const newDocument = parseFromString(result.data);
    const imageElements = getImageUrlsFromDocument(newDocument);

    imageUrls.push(...imageElements);

    yield [...imageUrls];

    await delay(500);
  }

  return imageUrls;
}

/** 解析所有预览页面 */
export async function parseImagePreview(url: string) {
  const preview = await axios.get(url).catch((e) => {
    // TODO: 错误处理
    return e;
  });

  const document = parseFromString(preview);
}
