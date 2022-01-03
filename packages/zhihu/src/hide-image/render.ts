import { ClassName, isInBoxAttr, btnText, ImageSelector } from './constant';
import { addClassName, removeClassName } from '@xiao-ai/utils/web';
import { isUndef } from '@xiao-ai/utils';

/** 图片节点包装器 */
export function wrapImage(img: HTMLElement) {
  const box = document.createElement('div');
  const btn = document.createElement('a');

  let isHide = true;

  function setStatus() {
    if (isHide) {
      btn.textContent = `== [${btnText[0]}] ==`;
      img.setAttribute(isInBoxAttr, '');
      addClassName(box, ClassName.ImageBoxHide);
      removeClassName(box, ClassName.ImageBoxDefault);
    }
    else {
      btn.textContent = `== [${btnText[1]}] ==`;
      img.removeAttribute(isInBoxAttr);
      addClassName(box, ClassName.ImageBoxDefault);
      removeClassName(box, ClassName.ImageBoxHide);
    }
  }

  box.setAttribute('class', ClassName.ImageBox);
  btn.setAttribute('class', ClassName.ImageBtn);
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
  (Array.from(document.querySelectorAll(ImageSelector)) as HTMLElement[])
    .filter((img) => isUndef(img.getAttribute(isInBoxAttr)))
    .forEach((img) => {
      const parent = img.parentElement;
      if (parent) {
        parent.insertBefore(wrapImage(img), img);
      }
    });
}
