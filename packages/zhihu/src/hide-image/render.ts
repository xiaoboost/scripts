import style from './style.jss';

import { isInBoxAttr, btnText } from './constant';
import { ZhihuClassName } from 'src/utils/constant';
import { addClassName, removeClassName } from '@xiao-ai/utils/web';
import { isUndef } from '@xiao-ai/utils';
import { log } from '@scripts/utils';

/** 图片节点包装器 */
export function wrapImage(img: HTMLElement) {
  const box = document.createElement('div');
  const btn = document.createElement('a');

  let isHide = false;

  function setStatus() {
    if (isHide) {
      btn.textContent = `═══ [${btnText[0]}] ═══`;
      addClassName(box, style.classes.ImageBoxHide);
    }
    else {
      btn.textContent = `╔══ [${btnText[1]}] ══╗`;
      removeClassName(box, style.classes.ImageBoxHide);
    }
  }

  img.setAttribute(isInBoxAttr, 'true');
  box.setAttribute('class', style.classes.ImageBox);
  btn.setAttribute('class', style.classes.ImageBtn);
  box.appendChild(btn);
  box.appendChild(img);

  setStatus();

  btn.addEventListener('click', () => {
    isHide = !isHide;
    setStatus();
  });

  return box;
}

/** 包装所有图片 */
export function wrapAllImage() {
  if (GlobalEnv.node === 'development') {
    log('刷新页面中的所有图片');
  }

  const tempDiv = document.createElement('div');
  const selector = `.${ZhihuClassName.AnswerContainer} figure[data-size]`;

  (Array.from(document.querySelectorAll(selector)) as HTMLElement[])
    .filter((img) => isUndef(img.getAttribute(isInBoxAttr)))
    .forEach((img) => {
      const parent = img.parentElement;

      if (parent) {
        parent.replaceChild(tempDiv, img);
        parent.replaceChild(wrapImage(img), tempDiv);
      }
    });
}
