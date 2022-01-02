import './style';

import { active as activeStore } from './store';
import { active as activeCommmand } from './command';

export function active() {
  activeStore();
  activeCommmand();
}
