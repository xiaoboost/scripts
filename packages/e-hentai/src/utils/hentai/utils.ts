/** 运行结果 */
export interface Result<T> {
  data?: T;
  message: string;
  extra?: string;
}

/** 画廊标题数据 */
export interface GalleryTitle {
  title: string;
  subtitle: string;
}

/** 图片信息 */
export interface ImageInfo {
  /** 图片链接 */
  url: string;
  /**
   * 图片数据大小
   *   - 单位：`KB`
   */
  dataSize: number;
  /** 图片宽高 */
  size: {
    width: number;
    height: number;
  };
}

/** 图片数据 */
export interface GalleryImageData {
  /** 图片文件名字 */
  name: string;
  /** 预览图片 */
  priview: ImageInfo;
  /** 图片原大小 */
  origin?: ImageInfo;
}

/** 绅士页面类名 */
export const ClassName = {
  RightAsideItem: 'g2',
  RightAsideSplitItem: 'gsp',
  PageList: 'ptt',
  ImageBox: 'gdtm',
  GalleryInfoTableName: 'gdt1',
  GalleryInfoTableValue: 'gdt2',
} as const;

/** 绅士页面编号名 */
export const IdName = {
  RightAside: 'gd5',
  ImageListBox: 'gdt',
  ImagePreviewInfo: 'i2',
  ImageOriginInfo: 'i7',
  ImagePreview: 'img',
  ImageOrigin: 'i7',
  GalleryMainTitle: 'gj',
  GallerySubTitle: 'gn',
  GalleryData: 'gmid',
  GalleryInfo: 'gdd',
  SearchOption: 'toppane',
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

/** 是否是搜索页面 */
export function isSearchPage() {
  return Boolean(document.querySelector(`#${IdName.SearchOption}`));
}

/** 是否是画廊页面 */
export function isGalleryPage() {
  return Boolean(document.querySelector(`#${IdName.GalleryData}`));
}

/** 无错误信息 */
export const NoError = 'ok';
