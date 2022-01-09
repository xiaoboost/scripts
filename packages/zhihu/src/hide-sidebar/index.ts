import style from './style.jss';

import { addStyle } from '@scripts/utils';
import { active as activeStore } from './store';
import { active as activeCommmand } from './command';

export function active() {
  activeStore();
  activeCommmand();
  addStyle(style.toString());
}
