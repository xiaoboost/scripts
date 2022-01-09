/** 绅士页面类名 */
export const HentaiClassName = {
  RightAsideItem: 'g2',
  RightAsideSplitItem: 'gsp',
};

/** 绅士页面编号名 */
export const HentaiIdName = {
  RightAside: 'gd5',
};

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
