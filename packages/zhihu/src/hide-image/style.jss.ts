import { createStyle } from '@scripts/utils';
import { ZhihuClassName } from 'src/utils/constant';

export default createStyle({
  ImageBtn: {},
  ImageBox: {},
  ImageBoxHide: {},

  [`.${ZhihuClassName.AnswerContainer}`]: {
    '& $ImageBox': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',

      '&$ImageBoxHide figure': {
        display: 'none',
      },

      '@global': {
        'figure[data-size]': {
          width: '100%',
          margin: 0,
          marginTop: 8,
        },
      },
    },
    '& $ImageBtn': {
      fontSize: 12,
      color: '#AAA',
      margin: 0,
      textDecoration: 'none',
      cursor: 'pointer',
    },
  },
});
