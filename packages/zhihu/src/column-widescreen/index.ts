import style from './index.jss';
import { addStyle } from '@scripts/utils';

export function active() {
  addStyle(style.toString());
}
