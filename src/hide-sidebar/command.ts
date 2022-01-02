import { isHide } from './store';
import { registerTiggerCommand } from 'src/utils/command';

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
