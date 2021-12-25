import { log } from './log';
import { isObject, isString } from '@xiao-ai/utils';

const styleId = 'zhihu-utils';

type JssObject = Partial<CSSStyleDeclaration> & {
  [key: string]: JssObject | string;
};

type JssInput = Record<string, JssObject>;

const codes: string[] = [];

export function addStyle(object: JssInput) {
  function jssToString(input: JssInput, prefix = '') {
    let content = '';

    const props = Object.keys(input);
    const subObjectKeys = props.filter((name) => isObject(input[name]));
    const declarationKeys = props.filter((name) => isString(input[name]));

    for (const key of declarationKeys) {
      content += `${key}: ${input[key]};\n`;
    }

    for (const key of subObjectKeys) {
      const selector = `${prefix} ${key}`.trim();
      content += (
        `${selector} {\n` +
        `${jssToString(input[key] as any, selector)}\n` +
        '}\n'
      );
    }

    return content;
  }

  codes.push(jssToString(object, ''));
}

window.onload = () => {
  let styleEl = document.getElementById(styleId) as HTMLStyleElement | null;

  if (styleEl) {
    if (process.env.NODE_ENV === 'development') {
      log('样式元素已存在，忽略此次加载');
    }
    return;
  }

  const headEl = document.getElementsByTagName('head')[0];

  styleEl = document.createElement('style');
  styleEl.innerHTML = codes.join('\n');
  styleEl.setAttribute('id', styleId);

  headEl.appendChild(styleEl);

  if (process.env.NODE_ENV === 'development') {
    log('样式元素加载成功');
  }
};
