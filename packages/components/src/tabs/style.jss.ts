import { createStyle } from '@scripts/utils';

export default createStyle({
  tabBox: {
    width: '100%',
    height: '100%',
    display: 'flex',
    overflow: 'hidden',
    flexDirection: 'column',
    fontSize: 14,
    backgroundColor: 'transparent',
  },
  tabHeader: {
    position: 'relative',
    display: 'flex',
    padding: '0 8px',
    marginBottom: 16,

    '&::before': {
      position: 'absolute',
      right: 0,
      left: 0,
      bottom: 0,
      borderBottom: '1px solid #000000',
      content: '" "',
    },
  },
  tabNavList: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 0,
    margin: 0,
  },
  tabMavHighlight: {},
  tabNavItem: {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    padding: '10px 6px',
    fontSize: 14,
    border: 0,
    outline: 'none',
    cursor: 'pointer',
    borderBottom: '1px solid transparent',

    '&$tabMavHighlight': {
      color: '#1890ff',
      borderBottom: '1px solid #1890ff',
    },
  },
  tabBody: {
    padding: '0 8px 8px 8px',
  },
});
