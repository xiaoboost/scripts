import { active as activeStyle } from './style';
import { active as activeStore } from './store';
import { active as activeCommmand } from './command';

export function active() {
  activeStyle();
  activeStore();
  activeCommmand();
}
