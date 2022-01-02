import { Status, CommandName } from './constant';
import { status } from './store';
import { isNumber } from '@xiao-ai/utils';

let commandId: number | undefined = undefined;

export function active() {
  // 解除之前的命令绑定
  if (isNumber(commandId)) {
    GM_unregisterMenuCommand(commandId);
  }

  // 绑定新的命令
  commandId = GM_registerMenuCommand(CommandName[status.data], () => {
    status.setData(status.data === Status.Default ? Status.Hide : Status.Default);
    active();
  });
}
