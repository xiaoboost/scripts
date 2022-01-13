/** 绅士页面类名 */
export const ClassName = {
  RightAsideItem: 'g2',
  RightAsideSplitItem: 'gsp',
  PageList: 'ptt',
  ImageBox: 'gdtm',
} as const;

/** 绅士页面编号名 */
export const IdName = {
  RightAside: 'gd5',
  ImageListBox: 'gdt',
  ImagePreviewInfo: 'i2',
  ImagePreview: 'img',
  ImageOrigin: 'i7',
} as const;

/** 网址类别 */
export enum HentaiKind {
  /** 表 */
  Normal,
  /** 里 */
  Ex,
}

/** 当前网站类别 */
export const hentaiKind = globalThis.location?.hostname.startsWith('exhentai')
  ? HentaiKind.Ex
  : HentaiKind.Normal;
