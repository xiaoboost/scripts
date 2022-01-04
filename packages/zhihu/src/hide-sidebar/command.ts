import { isHide } from './store';
import { registerTiggerCommand } from '@scripts/utils';

export function active() {
  registerTiggerCommand(
    ['隐藏侧边栏', '恢复侧边栏'],
    Number(isHide.data),
    (tigger) => {
      isHide.setData(!isHide.data);
      tigger();
    },
  );
}
