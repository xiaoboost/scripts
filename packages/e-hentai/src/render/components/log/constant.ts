/** 图片状态 */
export enum ImageStatus {
  /** 等待 */
  Waitting,
  /** 获取下载链接中 */
  ParsePreview,
  /** 获取下载链接中错误 */
  ParsePreviewError,
  /** 下载中 */
  Downloading,
  /** 下载错误 */
  DownloadError,
  /** 下载完成 */
  Downloaded,
}

/** 图片状态对应文本 */
export const StatusText = {
  [ImageStatus.Waitting]: '等待...',
  [ImageStatus.ParsePreview]: '解析预览页面',
  [ImageStatus.ParsePreviewError]: '解析出错',
  [ImageStatus.Downloading]: '下载中...',
  [ImageStatus.DownloadError]: '下载出错',
  [ImageStatus.Downloaded]: '下载完成',
};

/** 图片日志数据 */
export interface ImageLogData {
  /** 图片文件名 */
  name: string;
  /** 图片编号 */
  index: number;
  /** 编号是否连续 */
  isContinue: boolean;
  /** 预览页面网址 */
  pageUrl: string;
  /** 图片状态 */
  status: ImageStatus;
}
