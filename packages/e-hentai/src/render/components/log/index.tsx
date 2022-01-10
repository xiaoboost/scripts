import style from './style.jss';

import { h } from 'preact';
import { addStyle } from '@scripts/utils';
import { Tabs } from '@scripts/components';
import { stringifyClass as cln } from '@xiao-ai/utils';

import { hentaiKind, hentaiStyle, HentaiKind } from 'src/utils';

addStyle(style.toString());

export interface Props {

}

/**
 * 下载日志
 *  - 收集所有文件下载链接
 *  - 逐个下载
 */

export function Log(props: Props) {
  return (
    <div className={style.classes.box}>
      日志面板
    </div>
  );
}
