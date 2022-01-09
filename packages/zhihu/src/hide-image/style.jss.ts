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
    },
    '& $ImageBtn': {
      fontSize: '12px',
      color: '#AAA',
      textDecoration: 'none',
      marginBottom: '.4em',
    },
  },
});
