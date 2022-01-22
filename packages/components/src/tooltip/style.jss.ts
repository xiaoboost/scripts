import { createStyle } from '@scripts/utils';

export default createStyle({
  tooltipWrapper: {
    position: 'relative',
  },
  tooltipChild: {
    width: '100%',
  },
  tooltip: {
    position: 'fixed',
    maxWidth: 160,
    display: 'none',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    backgroundColor: '#888',
    whiteSpace: 'normal',
    padding: '2px 6px',
    zIndex: 10,
  },
});
