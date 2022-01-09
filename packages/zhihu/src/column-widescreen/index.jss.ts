import { createStyle } from '@scripts/utils';
import { ZhihuClassName } from 'src/utils/constant';

const width = 900;

export default createStyle({
  '@global': {
    article: {
      [`&.${ZhihuClassName.ColumnContainer}>*`]: {
        width: `${width}px !important`,
      }
    },
  },
  [`.${ZhihuClassName.ColumnAction}`]: {
    right: 'calc(50vw - 550px) !important',
  },
});
