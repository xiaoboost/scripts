import style from './style.jss';

import { isInBoxAttr, btnText } from './constant';
import { ZhihuClassName } from 'src/utils/constant';
import { addClassName, removeClassName } from '@xiao-ai/utils/web';
import { isUndef } from '@xiao-ai/utils';

/** 图片节点包装器 */
export function wrapImage(img: HTMLElement) {
  const box = document.createElement('div');
  const btn = document.createElement('a');

  let isHide = false;

  function setStatus() {
    if (isHide) {
      btn.textContent = `== [${btnText[0]}] ==`;
      img.setAttribute(isInBoxAttr, 'true');
      addClassName(box, style.classes.ImageBoxHide);
    }
    else {
      btn.textContent = `== [${btnText[1]}] ==`;
      img.removeAttribute(isInBoxAttr);
      removeClassName(box, style.classes.ImageBoxHide);
    }
  }

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

export function wrapAllImage() {
  const selector = `.${ZhihuClassName.AnswerContainer} figure[data-size]`;
  (Array.from(document.querySelectorAll(selector)) as HTMLElement[])
    .filter((img) => isUndef(img.getAttribute(isInBoxAttr)))
    .forEach((img) => {
      const tempDiv = document.createElement('div');
      const parent = img.parentElement;

      if (parent) {
        parent.replaceChild(tempDiv, img);
        parent.replaceChild(wrapImage(img), tempDiv);
      }
    });
}
