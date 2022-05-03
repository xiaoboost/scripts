import style from './style.jss';

import { log, onLoad } from '@scripts/utils';
import { Watcher } from '@xiao-ai/utils';
import { StoreKey } from './constant';
import { observerOption } from 'src/utils/constant';
import { addClassName, removeClassName } from '@xiao-ai/utils/web';

/** 当前侧边栏状态 */
export const isHide = new Watcher(GM_getValue(StoreKey, true));

/** 保存状态 */
function setStatus(val: boolean) {
  if (GlobalEnv.node === 'development') {
    log(`当前边栏状态为: ${val ? '隐藏' : '默认'}`)
  }

  GM_setValue(StoreKey, val);

  val
    ? addClassName(document.body, style.classes.WidthFullMain)
    : removeClassName(document.body, style.classes.WidthFullMain);
}

/** 初始化 */
export function active() {
  onLoad(unsafeWindow, () => {
    setStatus(isHide.data);

    // body 属性变更时重置类属性
    const observer = new MutationObserver(() => {
      setStatus(isHide.data);

      if (GlobalEnv.node === 'development') {
        log('body 元素 class 属性变更，重置属性')
      }
    });

    observer.observe(document.body, {
      ...observerOption,
      attributeFilter: ['class'],
      attributes: true,
    });
  });
}

// 监听变更
isHide.observe(setStatus);
