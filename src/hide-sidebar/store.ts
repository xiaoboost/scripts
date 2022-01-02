import { log } from 'src/utils/log';
import { Watcher } from '@xiao-ai/utils';
import { SelectorName, StoreKey } from './constant';
import { addClassName, removeClassName } from '@xiao-ai/utils/web';

/** 当前侧边栏状态 */
export const isHide = new Watcher(GM_getValue(StoreKey, true));

/** 保存状态 */
function setStatus(val: boolean) {
  if (process.env.NODE_ENV === 'development') {
    log(`当前边栏状态为: ${val ? '隐藏' : '默认'}`)
  }

  GM_setValue(StoreKey, val);

  val
    ? addClassName(document.body, SelectorName.WidthFullMain)
    : removeClassName(document.body, SelectorName.WidthFullMain);
}

/** 初始化 */
export function active() {
  unsafeWindow.addEventListener('load', () => {
    setStatus(isHide.data);
  });
}

// 监听变更
isHide.observe(setStatus);
