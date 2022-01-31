import style from './style.jss';

import { bindEventAttr, listSelector } from './utils';
import { ZhihuClassName } from 'src/utils/constant';
import { addRecord, getRecordList } from './store';
import { addClassName } from '@xiao-ai/utils/web';
import { log } from '@scripts/utils';

function getAnswerUrl(answer: Element) {
  const selector = `.${ZhihuClassName.MainQuestionItemTitle} a[href]`;
  const urlDom = answer.querySelector(selector);

  if (urlDom) {
    return urlDom.getAttribute('href');
  }
  else {
    return null;
  }
}

/** 回答元素处理 */
export function wrapAnswer(answer: HTMLElement) {
  // 已经绑定事件，退出
  if (answer.getAttribute(bindEventAttr)) {
    return;
  }

  answer.setAttribute(bindEventAttr, 'true');
  answer.addEventListener('click', () => {
    addClassName(answer, style.classes.readAnswer);
    addRecord(getAnswerUrl(answer) ?? '');
  });
}

/** 处理所有回答 */
export function wrapAllAnswer() {
  if (GlobalEnv.node === 'development') {
    log('标记页面中的所有旧回答');
  }

  const record = getRecordList();
  const selector = `${listSelector} > .${ZhihuClassName.MainQuestionItem}`;
  const answers = Array.from(document.querySelectorAll(selector)) as HTMLElement[];

  for (const ans of answers) {
    const ansUrl = getAnswerUrl(ans);

    if (!ansUrl) {
      continue;
    }

    if (record[ansUrl.trim()]) {
      addClassName(ans, style.classes.readAnswer);
    }

    wrapAnswer(ans);
  }
}
