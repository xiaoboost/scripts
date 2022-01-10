import { createStyle } from '@scripts/utils';
import { HentaiKind, HentaiStyle } from 'src/utils';

export default createStyle({
  box: {
    display: 'flex',
    flexDirection: 'column',
    width: 300,
  },
  article: {
    flexGrow: 1,
  },
  footer: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
