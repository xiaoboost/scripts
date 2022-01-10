import style from './style.jss';

import { h, ComponentChildren } from 'preact';
import { useState } from 'preact/hooks';
import { addStyle } from '@scripts/utils';
import { Tabs } from '@scripts/components';
import { stringifyClass as cln } from '@xiao-ai/utils';

import { hentaiKind, hentaiStyle, HentaiKind } from 'src/utils';

addStyle(style.toString());

export interface Props {
  // ..
}

interface SettingBoxProps {
  title: string;
  children?: ComponentChildren;
}

function SettingBox(props: SettingBoxProps) {
  return (
    <section className={style.classes.settingBox}>
      <h2 className={style.classes.settingTitle}>{props.title}</h2>
      <div className={style.classes.settingBody}>{props.children}</div>
    </section>
  );
}

export function Setting(props: Props) {
  const [downloading, setLoading] = useState(false);

  /**
   * 选择文件类别
   *  - 原始文件（如果有）
   *  - 压缩文件
   *
   * 选择下载范围
   *  - 默认全部
   *  - 单个
   *  - 范围
   *  - 增加和删除按钮
   *
   * 下载按钮 / 关闭按钮
   */

  return (
    <div className={style.classes.box}>
      <article className={style.classes.body}>
        <SettingBox title='下载选项'>
          内容
        </SettingBox>
        <SettingBox title='下载范围'>
          内容
        </SettingBox>
      </article>
      <footer className={style.classes.footer}>
        <button
          disabled={!downloading}
        >
          中断下载
        </button>
        <button
          className={style.classes.btn}
          disabled={downloading}
        >
          下载画廊
        </button>
      </footer>
    </div>
  );
}
