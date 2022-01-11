import style from './style.jss';

import { h, ComponentChildren } from 'preact';
import { useState } from 'preact/hooks';
import { addStyle } from '@scripts/utils';
import { Tabs } from '@scripts/components';
import { stringifyClass as cln } from '@xiao-ai/utils';

import { hentaiKind, hentaiStyle, HentaiKind } from 'src/utils';

import { ImageKind, RangeKind, SettingData } from './constant';

addStyle(style.toString());

export interface Props {
  data: SettingData;
  onChange?(data: SettingData): void;
  onDownload?(): void;
  onCancel?(): void;
}

interface FormBoxProps {
  title: string;
  children?: ComponentChildren;
}

function FormBox(props: FormBoxProps) {
  return (
    <section className={style.classes.formBox}>
      <h2 className={style.classes.formBoxTitle}>{props.title}</h2>
      <div className={style.classes.formBoxBody}>{props.children}</div>
    </section>
  );
}

interface FormRowProps {
  label: string;
  children?: ComponentChildren;
}

function FormRow(props: FormRowProps) {
  return (
    <section className={style.classes.formRow}>
      <label className={style.classes.formRowLabel}>{props.label}</label>
      <div className={style.classes.formRowBody}>{props.children}</div>
    </section>
  );
}

export function Setting(props: Props) {
  const [downloading, setLoading] = useState(false);
  const onDownload = () => {
    setLoading(true);
    props.onDownload?.();
  };
  const onCancel = () => {
    setLoading(false);
    props.onCancel?.();
  };

  return (
    <div className={style.classes.box}>
      <article className={style.classes.body}>
        <FormBox title='下载选项'>
          <FormRow label='选择文件类别'>
            下拉选择框
              - 原始文件（如果有）
              - 压缩文件
          </FormRow>
        </FormBox>
        <FormBox title='下载范围'>
          {/* - 默认全部
          - 单个
          - 范围
          - 增加和删除按钮 */}
        </FormBox>
      </article>
      <footer className={style.classes.footer}>
        <button
          disabled={!downloading}
          onClick={onCancel}
        >
          中断下载
        </button>
        <button
          className={style.classes.btn}
          disabled={downloading}
          onClick={onDownload}
        >
          下载画廊
        </button>
      </footer>
    </div>
  );
}
