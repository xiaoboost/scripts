import type { default as Jss, Styles } from 'jss';

import { log } from './log';
import { hyphenate } from '@xiao-ai/utils';

const codes: string[] = [];
const NameHash: Record<string, number | undefined> = {};

/** 外部注入虚拟 jss 变量 */
declare const jss: typeof Jss;

export function addStyle(code: string) {
  codes.push(code);
}

export interface JssResult<Name extends string> {
  classes: Record<Name, string>;
  toString(): string;
}

/**
 * 生成样式
 * @param style
 * @param holdClassName
 * @returns Pick<StyleSheet<Name>, 'classes' | 'toString'>
 */
export function createStyle<Name extends string>(
  style: Partial<Styles<Name, any, undefined>>,
  holdClassName = false,
): JssResult<Name> {
  return jss.createStyleSheet(style, {
    generateId(rule) {
      debugger;

      if (rule.key.startsWith('.')) {
        return rule.key.substring(1);
      }

      if (holdClassName) {
        return rule.key;
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
