import { createStyle } from '@scripts/utils';
import { HentaiKind, HentaiStyle } from 'src/utils';

export default createStyle({
  box: {
    display: 'flex',
    flexDirection: 'column',
    width: 300,
  },
  body: {
    flexGrow: 1,
    marginBottom: 10,
  },
  footer: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  btn: {
    marginLeft: 6,
  },
  settingBox: {
    marginBottom: 14,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: 'normal',
    margin: '0 0 10px 0',
  },
  settingBody: {
    paddingLeft: 6,
  },
});
