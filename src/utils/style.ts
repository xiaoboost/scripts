import { log } from './log';
import { isObject, isString, hyphenate } from '@xiao-ai/utils';

type JssObject = Partial<CSSStyleDeclaration> | {
  [key: string]: JssObject;
};

type JssInput = Record<string, JssObject>;

const codes: string[] = [];

export function addStyle(object: JssInput) {
  function styleObjectToString(input: JssInput, selector: string, keys: string[]) {
    let content = `${selector} {\n`;

    for (const key of keys) {
      content += `  ${hyphenate(key)}: ${input[key]};\n`;
    }

    content += '}\n\n';

    return content;
  }

  function jssToString(input: JssInput, prefix = '') {
    let content = '';

    const props = Object.keys(input);
    const subObjectKeys = props.filter((name) => isObject(input[name]));
    const declarationKeys = props.filter((name) => isString(input[name]));

    if (declarationKeys.length > 0) {
      content += styleObjectToString(input, prefix, declarationKeys);
    }

    for (const key of subObjectKeys) {
      content += jssToString(input[key] as any, `${prefix} ${key}`.trim());
    }

    return content;
  }

  codes.push(jssToString(object, ''));
}

unsafeWindow.addEventListener('load', () => {
  GM_addStyle(codes.join('\n'));

  if (process.env.NODE_ENV === 'development') {
    log('样式元素加载成功');
  }
});
