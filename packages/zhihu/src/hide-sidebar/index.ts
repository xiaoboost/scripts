import style from './style.jss';

import { addStyle } from '@scripts/utils';
import { active as activeStore } from './store';
import { active as activeCommand } from './command';

export function active() {
  activeStore();
  activeCommand();
  addStyle(style.toString());
}
