import { ZhihuClassName } from 'src/utils/constant';
import { ClassName } from './constant';
import { addStyle } from '@scripts/utils';

export function active() {
  addStyle({
    [`.${ZhihuClassName.AnswerContainer}`]: {
      [`.${ClassName.ImageBox}`]: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
      [`.${ClassName.ImageBox}.${ClassName.ImageBoxHide}`]: {
        figure: {
          display: 'none',
        },
      },
      [`.${ClassName.ImageBtn}`]: {
        fontSize: '12px',
        color: '#AAA',
        textDecoration: 'none',
        marginBottom: '.4em',
      },
    },
  });
}
