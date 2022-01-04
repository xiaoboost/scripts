import { isNumber } from '@xiao-ai/utils';

/** 注册对称命令 */
export function registerTiggerCommand(
  names: [string, string],
  defaultIndex: number,
  cb: (tigger: () => void) => void,
) {
  let commandId: number | undefined = undefined;
  let index = defaultIndex;

  function tiger() {
    // 解除之前的命令绑定
    if (isNumber(commandId)) {
      GM_unregisterMenuCommand(commandId);
    }

    // 绑定新的命令
    commandId = GM_registerMenuCommand(names[index], () => {
      cb(tiger);
    });

    // 下标变化
    index = 1 - index;
  }

  tiger();
}
