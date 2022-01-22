import { fetch } from "./fetch";

/** 下载文件 */
export async function download(url: string, name: string) {
  const fileBlob = await fetch(url, { responseType: 'blob' }).then((data) => data.blob());
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
