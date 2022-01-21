import { fetch } from "./fetch";

/** 下载文件 */
export async function download(url: string, name: string) {
  try {
    const fileBlob = await fetch(url, { responseType: 'blob' }).then((data) => data.blob());
    const vLink = document.createElement('a');

    vLink.href = URL.createObjectURL(fileBlob);
    vLink.download = name;
    vLink.click();

    URL.revokeObjectURL(vLink.href);
    return true;
  }
  catch (e) {
    console.warn(e);
    return false;
  }
}
