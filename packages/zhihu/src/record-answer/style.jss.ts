import { createStyle } from '@scripts/utils';
import { ZhihuClassName } from 'src/utils/constant';

const readColor = '#777';

export default createStyle({
  readAnswer: {
    [`&.${ZhihuClassName.MainQuestionItem}`]: {
      [`
        & .${ZhihuClassName.MainQuestionItemTitle},
        & .${ZhihuClassName.AnswerContainer}.${ZhihuClassName.AnswerCollapsed}
      `]: {
        color: readColor,
      },
    },
  },
});
