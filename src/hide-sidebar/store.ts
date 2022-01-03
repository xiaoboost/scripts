import { log } from 'src/utils/log';
import { Watcher } from '@xiao-ai/utils';
import { ClassName, StoreKey } from './constant';
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
    ? addClassName(document.body, ClassName.WidthFullMain)
    : removeClassName(document.body, ClassName.WidthFullMain);
}

/** 初始化 */
export function active() {
  unsafeWindow.addEventListener('load', () => {
    setStatus(isHide.data);

    // body 属性变更时重置类属性
    const observer = new MutationObserver(() => {
      setStatus(isHide.data);

      if (process.env.NODE_ENV === 'development') {
        log('body 元素 class 属性变更，重置属性')
      }
    });

    observer.observe(document.body, {
      attributeFilter: ['class'],
      attributes: true,
      attributeOldValue: false,
      characterData: false,
      characterDataOldValue: false,
      childList: false,
      subtree: false,
    })
  });
}

// 监听变更
isHide.observe(setStatus);
