import { ErrorCode } from 'src/utils';

/** 图片状态 */
export enum ImageStatus {
  /** 等待 */
  Waitting,
  /** 解析预览链接 */
  ParsePreview,
  /** 下载中 */
  Downloading,
  /** 下载完成 */
  Downloaded,
  /** 发生错误 */
  Error,
}

/** 图片状态对应文本 */
export const StatusText = {
  [ImageStatus.Waitting]: '等待...',
  [ImageStatus.ParsePreview]: '解析预览页面',
  [ImageStatus.Downloading]: '下载中...',
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
  /** 错误码 */
  error?: ErrorCode;
}
