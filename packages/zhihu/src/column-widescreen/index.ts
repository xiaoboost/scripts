import { ZhihuClassName } from 'src/utils/constant';
import { addStyle } from '@scripts/utils';

const width = 900;

export function active() {
  addStyle({
    [`article.${ZhihuClassName.ColumnContainer} > *`]: {
      width: `${width}px !important`,
    },
    [`.${ZhihuClassName.ColumnAction}`]: {
      right: 'calc(50vw - 550px) !important',
    },
  });
}
