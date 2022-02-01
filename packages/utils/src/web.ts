import { fetch, Response } from "./fetch";

type CheckErrorResult = string | null | undefined | void;

/** 下载文件 */
export async function download(
  url: string,
  name: string,
  errorCheck?: (blob: Blob, response: Response) => CheckErrorResult | Promise<CheckErrorResult>,
) {
  const response = await fetch(url, { responseType: 'blob' });
  const fileBlob = await response.blob();
  const checkResult = errorCheck ? await errorCheck(fileBlob, response) : null;

  if (checkResult) {
    throw new Error(checkResult);
  }

  const vLink = document.createElement('a');

  vLink.href = URL.createObjectURL(fileBlob);
  vLink.download = name;
  vLink.click();

  URL.revokeObjectURL(vLink.href);
}

/** 获取元素相对于屏幕的位置 */
export function getOffset(el: HTMLElement) {
  let left = 0;
  let top = 0;
  let current: HTMLElement | null = el;

  while (current) {
    left += current.offsetLeft;
    top += current.offsetTop;
    current = current.offsetParent as HTMLElement | null;
  }

  return { left, top };
}
