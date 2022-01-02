import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';

import { log } from 'src/utils/log';
import { SelectorName, StoreKey, defaultSvgPath, hideSvgPath } from './constant';
import { stringifyClass } from '@xiao-ai/utils';
import { addClassName, removeClassName } from '@xiao-ai/utils/web';

/** 初始值 */
const defaultStore = GM_getValue(StoreKey, false);

/** 按钮渲染 */
export function Button() {
  const [isHide, setHide] = useState(defaultStore);
  const onClick = () => setHide(!isHide);

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      log(`当前边栏状态为: ${isHide ? '隐藏' : '显示'}`)
    }

    GM_setValue(StoreKey, isHide);

    isHide
      ? addClassName(document.body, SelectorName.WidthFullMain)
      : removeClassName(document.body, SelectorName.WidthFullMain);
  }, [isHide]);

  return (
    <span
      className={stringifyClass(SelectorName.SideBarBtn, {
        [SelectorName.SideBarBtnHide]: isHide,
        [SelectorName.SideBarBtnDefault]: !isHide,
      })}
      onClick={onClick}
    >
      <svg viewBox="64 64 896 896" width="1em" height="1em" fill="currentColor">
        <path d={isHide ? hideSvgPath : defaultSvgPath} />
      </svg>
    </span>
  );
}
