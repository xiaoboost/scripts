import { HentaiKind, hentaiKind } from './utils';

/** 网站样式枚举 */
export const HentaiStyle = {
  [HentaiKind.Normal]: {
    backgroundColor: '#E3E0D1',
    textColor: '#f1f1f1',
    shadowColor: '#4c0d01',
    buttonColor: '#5C0D11',
    borderColor: '#5C0D12',
  },
  [HentaiKind.Ex]: {
    backgroundColor: '#34353b',
    textColor: '#f1f1f1',
    shadowColor: '#919191',
    buttonColor: '#dddddd',
    borderColor: '#000000',
  },
};

/** 当前网站样式 */
export const hentaiStyle = HentaiStyle[hentaiKind];
