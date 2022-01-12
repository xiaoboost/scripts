import { createStyle } from '@scripts/utils';
import { HentaiKind, HentaiStyle } from 'src/utils';

const scrollbarWidth = 6;

export default createStyle({
  box: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  spaceBox: {
    height: 190,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  spaceList: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    paddingTop: 0,
    paddingBottom: 10,
  },
  article: {
    height: 300,
    overflowX: 'hidden',
    overflowY: 'auto',
  },
  logList: {
    marginTop: 10,
    padding: 0,
    border: `1px solid #000`,
    marginRight: 4,
  },
  logItem: {
    borderBottom: `1px solid #000`,

    '&:last-child': {
      borderBottom: 0,
    },

    '& > *': {
      borderRight: `1px solid #000`,
      display: 'inline-block',
      boxSizing: 'border-box',
      padding: 4,
      fontSize: 14,
      lineHeight: '14px',
    },

    '& > *:last-child': {
      borderRight: 0,
    },
  },
  logIndex: {
    width: 40,
    textAlign: 'left',
  },
  logName: {
    width: 130,
    textAlign: 'center',
  },
  logPreview: {
    width: 40,
    textAlign: 'center',
  },
  logStatus: {
    width: 110,
    textAlign: 'center',
  },
  '@global': {
    '$article': {
      '&::-webkit-scrollbar': {
        width: scrollbarWidth,
        height: scrollbarWidth,
        backgroundColor: '#888',
      },
      '&::-webkit-scrollbar-track': {
        boxShadow: `inset 0 0 ${scrollbarWidth / 2}px rgba(0, 0, 0, .3)`,
        backgroundColor: '#888',
      },
      '&::-webkit-scrollbar-thumb': {
        opacity: '0.7',
        boxShadow: `inset 0 0 ${scrollbarWidth / 2}px rgba(0, 0, 0, .3)`,
        backgroundColor: '#303133',
        transition: 'opacity ease-in-out 200ms',

        '&:hover': {
          opacity: '1',
        },
      },
    },
  },
});
