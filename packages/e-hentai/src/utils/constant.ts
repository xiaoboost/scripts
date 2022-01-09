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

/** 网站背景色 */
export const HentaiStyle = {
  [HentaiKind.Normal]: {
    backgroundColor: '#E3E0D1',
    textColor: '#5C0D11',
    buttonColor: '#5C0D11',
    borderColor: '#5C0D12',
  },
  [HentaiKind.Ex]: {
    backgroundColor: '#34353b',
    textColor: '#f1f1f1',
    buttonColor: '#dddddd',
    borderColor: '#000000',
  },
};

/** 当前网站类别 */
export const hentaiKind = globalThis.location?.hostname.startsWith('exhentai')
  ? HentaiKind.Ex
  : HentaiKind.Normal;

/** 当前网站样式 */
export const hentaiStyle = HentaiStyle[hentaiKind];
