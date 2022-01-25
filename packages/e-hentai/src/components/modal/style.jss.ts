import { createStyle } from '@scripts/utils';
import { HentaiKind, HentaiStyle } from 'src/utils';

export default createStyle({
  modalMask: {
    position: 'fixed',
    width: '100vw',
    height: '100vh',
    left: 0,
    top: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalEx: {},
  modalNormal: {},
  modal: {
    width: 360,
    top: GlobalEnv.node === 'development' ? 0 : '-15%',
    borderRadius: 10,
    position: 'relative',

    '&$modalEx': {
      boxShadow: `0px 0px 10px ${HentaiStyle[HentaiKind.Ex].shadowColor}`,
      backgroundColor: HentaiStyle[HentaiKind.Ex].backgroundColor,
      color: HentaiStyle[HentaiKind.Ex].textColor,
    },
    '&$modalNormal': {
      boxShadow: `0px 0px 10px ${HentaiStyle[HentaiKind.Normal].shadowColor}`,
      backgroundColor: HentaiStyle[HentaiKind.Normal].backgroundColor,
      color: HentaiStyle[HentaiKind.Normal].textColor,
    },
  },
  closeBtn: {
    position: 'absolute',
    right: 8,
    top: 12,
    fontSize: 14,
    cursor: 'pointer',
  },
});
