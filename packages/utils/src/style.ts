import type { default as Jss, Styles } from 'jss';

import { log } from './log';
import { hyphenate } from '@xiao-ai/utils';

const codes: string[] = [];

/** 外部注入虚拟 jss 变量 */
declare const jss: typeof Jss;
/** 外部注入虚拟类名表 */
declare const NameHash: Record<string, number | undefined>;

export function addStyle(code: string) {
  codes.push(code);
}

export interface JssResult<Name extends string> {
  classes: Record<Name, string>;
  toString(): string;
}

/** 生成样式 */
export function createStyle<Name extends string>(
  style: Partial<Styles<Name, any, undefined>>,
): JssResult<Name> {
  return jss.createStyleSheet(style, {
    generateId(rule) {
      if (rule.key.startsWith('.')) {
        return rule.key.substring(1);
      }

      const name = hyphenate(rule.key);
      const hash = (NameHash[name] ?? -1) + 1;

      NameHash[name] = hash;

      return `script-${name}-${hash}`;
    },
  }).attach();
}

setTimeout(() => {
  GM_addStyle(codes.join('\n'));

  if (GlobalEnv.node === 'development') {
    log('样式元素加载成功');
  }
});
