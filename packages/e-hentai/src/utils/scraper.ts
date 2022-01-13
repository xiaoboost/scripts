import { parseFromString } from './dom';
import { ClassName, IdName } from './constant';
import { isString, isDef, delay } from '@xiao-ai/utils';

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

function getHtml(url: string) {
  return fetch(url).then((data) => data.text());
}

function getImageName(info: string) {
  return info.split('::')[0]?.trim() ?? '';
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
export async function *getImagePreviewUrls(url: string | string[]) {
  const urls = isString(url) ? [url] : url;
  const imageUrls: string[] = [];

  for (const link of urls) {
    const html = await getHtml(link).catch(() => {
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

type ImageData =
  | {
    error: ErrorCode;
  }
  | {
    name: string;
    previewUrl: string;
    originUrl?: string;
  };

/** 解析所有预览页面 */
export async function getImageUrlFromPreview(url: string): Promise<ImageData> {
  const preview = await getHtml(url).catch((e) => {
    console.warn(e);
  });

  if (!preview) {
    return {
      error: ErrorCode.GetPreviewPage,
    };
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

/** 下载文件 */
export async function downloadFile(url: string, name: string) {
  // return new Promise<void>((resolve) => {
  //   const page = unsafeWindow.open(url, '_blank');

  //   page?.addEventListener('load', () => {
  //     resolve();
  //   });
  // });
  // return new Promise<void>((resolve) => {
  //   // unsafeWindow.open(url, '_blank');

  //   const image = new Image();

  //   image.src = url;
  //   image.crossOrigin = 'anonymous';

  //   image.onload = () => {
  //     const canvas = document.createElement('canvas');
  //     const context = canvas.getContext('2d')!;

  //     debugger;
  //     canvas.width = image.width;
  //     canvas.height = image.height;
  //     context.drawImage(image, 0, 0);

  //     const base64 = context.canvas.toDataURL();

  //     debugger;
  //     resolve();
  //   };

  //   image.onerror = () => {
  //     debugger;
  //   };
  // })
  // const fileBlob = await fetch(url).then((data) => data.blob());
  // debugger;
  // const vLink = document.createElement('a');

  // vLink.href = URL.createObjectURL(fileBlob);
  // vLink.download = name;
  // vLink.click();

  // URL.revokeObjectURL(vLink.href);
  // debugger;

  return new Promise<void>(async (resolve) => {
    const iframe = document.createElement('iframe');

    iframe.src = '';
    document.body.appendChild(iframe);

    iframe.contentWindow!.document.body.innerHTML = `
      <image src="${url}">
      <script>
      function test() {
        alert('helo')
      }

      window.test = test;
      </script>
    `;

    await delay(100);

    debugger;

    iframe.contentWindow!['targetFunction']();

    iframe.addEventListener('load', () => {
      debugger;
      resolve();
    });
  });
}
