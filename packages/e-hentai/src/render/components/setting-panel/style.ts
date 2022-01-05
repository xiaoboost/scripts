import { addStyle } from '@scripts/utils';
import { hentaiStyle } from 'src/utils';

addStyle({
  '.panel-mask': {
    position: 'fixed',
    width: '100vw',
    height: '100vh',
    left: '0',
    top: '0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  '.panel': {
    boxShadow: `0px 0px 10px ${hentaiStyle.textColor}`,
    backgroundColor: hentaiStyle.backgroundColor,
    color: hentaiStyle.textColor,
    borderRadius: '10px',
    width: '200px',
    minHeight: '200px',
  },
});
