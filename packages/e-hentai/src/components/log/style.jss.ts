import { createStyle } from '@scripts/utils';

const scrollbarWidth = 6;

export default createStyle({
  box: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    boxSizing: 'border-box',
    borderColor: '#000',
  },
  spaceBox: {
    height: 100,
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
  listBox: {
    display: 'flex',
    border: '1px solid',
    listStyle: 'none',
  },
  comlunList: {
    flexGrow: 0,
    flexShrink: 0,
    padding: 0,
    margin: 0,
    listStyle: 'none',
    borderRight: '1px solid',
    display: 'flex',
    flexDirection: 'column',
  },
  indexList: {
    // ..
  },
  nameList: {
    flexGrow: 1,
    maxWidth: 245,
  },
  msgList: {
    flexGrow: 1,
    borderRight: 0,
    maxWidth: 70,
  },
  listItem: {
    borderTop: '1px solid',
    padding: '2px 4px',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    boxSizing: 'border-box',
    height: 22,

    '&:first-child': {
      borderTop: 0,
    },
  },
  errorMsg: {
    color: '#ff6900',
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
