import style from './style.jss';

import { addStyle } from '@scripts/utils';
import { wrapAllImage } from './render';
// import {  } from './constant';

function watch() {
  /**
   * 监听列表变化
   * 监听答案变化
   */
}

export function active() {
  addStyle(style.toString());

  unsafeWindow.addEventListener('load', () => {
    wrapAllImage();
  });
}
