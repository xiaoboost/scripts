import { createStyle } from '@scripts/utils';
import { HentaiKind, HentaiStyle } from 'src/utils';

export default createStyle({
  PanelMask: {
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
  PanelEx: {},
  PanelNormal: {},
  Panel: {
    borderRadius: 10,

    '&$PanelEx': {
      boxShadow: `0px 0px 10px ${HentaiStyle[HentaiKind.Ex].shadowColor}`,
      backgroundColor: HentaiStyle[HentaiKind.Ex].backgroundColor,
      color: HentaiStyle[HentaiKind.Ex].textColor,
    },
    '&$PanelNormal': {
      boxShadow: `0px 0px 10px ${HentaiStyle[HentaiKind.Normal].shadowColor}`,
      backgroundColor: HentaiStyle[HentaiKind.Normal].backgroundColor,
      color: HentaiStyle[HentaiKind.Normal].textColor,
    },
  },
});