import style from './style.jss';

import { debounce } from '@xiao-ai/utils';
import { addStyle, onLoad } from '@scripts/utils';
import { observerOption } from 'src/utils/constant';
import { wrapAllImage } from './render';

addStyle(style.toString());

export function active() {
  onLoad(unsafeWindow, () => {
    const wrapImageDebounce = debounce(wrapAllImage, 200);
    const observer = new MutationObserver(wrapImageDebounce);

    observer.observe(document.body, {
      ...observerOption,
      childList: true,
      subtree: true,
    });

    wrapImageDebounce();
  });
}
