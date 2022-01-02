import { log } from 'src/utils/log';
import { Watcher } from '@xiao-ai/utils';
import { SelectorName, StoreKey, Status } from './constant';
import { addClassName, removeClassName } from '@xiao-ai/utils/web';

/** 当前侧边栏状态 */
export const status = new Watcher(GM_getValue(StoreKey, Status.Default));

function setStatus(val: Status) {
  if (process.env.NODE_ENV === 'development') {
    log(`当前边栏状态为: ${Status[val]}`)
  }

  GM_setValue(StoreKey, val);

  val
    ? addClassName(document.body, SelectorName.WidthFullMain)
    : removeClassName(document.body, SelectorName.WidthFullMain);
}

/** 初始化 */
export function active() {
  unsafeWindow.addEventListener('load', () => {
    setStatus(status.data);
  });
}

// 监听变更
status.observe(setStatus);
