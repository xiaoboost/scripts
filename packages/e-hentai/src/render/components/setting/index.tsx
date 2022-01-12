import style from './style.jss';

import { h } from 'preact';
import { useState } from 'preact/hooks';
import { addStyle } from '@scripts/utils';
import { Select, IconPlus } from '@scripts/components';
import { stringifyClass as cln } from '@xiao-ai/utils';

import { RangeBox } from './components/range';
import { FormBox, FormRow } from './components/form';
import { ImageKind, SettingData } from './constant';

export * from './constant';

addStyle(style.toString());

export interface Props {
  data: SettingData;
  onChange?(data: SettingData): void;
  onDownload?(): void;
  onCancel?(): void;
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
  const onChange = (data: Partial<SettingData>) => {
    props.onChange?.({
      ...props.data,
      ...data,
    });
  };

  return (
    <div className={style.classes.box}>
      <article className={style.classes.body}>
        <FormBox title='下载选项'>
          <FormRow label='图像类别'>
            <Select
              value={props.data.imageKind}
              defaultValue={ImageKind.Origin}
              onChange={(imageKind: ImageKind) => onChange({ imageKind })}
              options={[
                {
                  name: '原始文件（如果有）',
                  value: ImageKind.Origin,
                },
                {
                  name: '压缩文件',
                  value: ImageKind.Shrink,
                },
              ]}
            />
          </FormRow>
        </FormBox>
        <FormBox title='下载范围'>
          <RangeBox
            data={props.data.range}
            onChange={(range) => onChange({ range })}
          />
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
