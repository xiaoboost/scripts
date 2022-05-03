import style from './style.jss';

import { addStyle, log, onLoad } from '@scripts/utils';
import { debounce } from '@xiao-ai/utils';
import { observerOption } from 'src/utils/constant';
import { listSelector } from './utils';
import { wrapAllAnswer } from './render';

addStyle(style.toString());

export function active() {
  onLoad(unsafeWindow, () => {
    const listDom = document.querySelector(listSelector);

    if (!listDom) {
      if (GlobalEnv.node === 'development') {
        log('未发现问题列表容器元素，已读问题标记失败');
      }

      return;
    }

    const wrapImageDebounce = debounce(wrapAllAnswer, 200);
    const observer = new MutationObserver(wrapImageDebounce);

    observer.observe(document.body, {
      ...observerOption,
      childList: true,
    });

    wrapImageDebounce();
  });
}
