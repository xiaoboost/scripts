import { ImageLogData, ImageStatus } from './constant';

export function createImageLog(newUrls: string[], oldUrls: ImageLogData[] = []) {
  const urls: ImageLogData[] = newUrls
    .filter((url) => !oldUrls.find((old) => old.pageUrl === url))
    .map((url) => {
      const indexMatch = /-(\d+)$/.exec(url);
      const index = indexMatch ? Number.parseInt(indexMatch[1]) : 0;

      return {
        name: '',
        index,
        isContinue: true,
        pageUrl: url,
        status: ImageStatus.Waitting,
      };
    });

  return [...urls, ...oldUrls]
    .sort((pre, next) => pre.index > next.index ? 1 : -1)
    .map((item, i, arr) => {
      if (i === 0) {
        item.isContinue = true;
        return item;
      }

      // 相差`1`为连续
      item.isContinue = (item.index - arr[i - 1].index === 1);

      return item;
    });
}
