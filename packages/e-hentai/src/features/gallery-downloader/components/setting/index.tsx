import style from './style.jss';

import { h } from 'preact';
import { addStyle } from '@scripts/utils';
import { Select } from '@scripts/components';

import { RangeBox } from './range';
import { FormBox, FormRow } from './form';
import { ImageKind, SettingData } from './utils';

export * from './utils';

addStyle(style.toString());

export interface Props {
  data: SettingData;
  disabled?: boolean;
  onChange?(data: SettingData): void;
  onDownload?(): void;
  onCancel?(): void;
}

export function Setting(props: Props) {
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
              disabled={props.disabled}
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
            data={props.data.ranges}
            disabled={props.disabled}
            onChange={(ranges) => onChange({ ranges })}
          />
        </FormBox>
      </article>
      <footer className={style.classes.footer}>
        <button
          disabled={!props.disabled}
          onClick={props.onCancel}
        >
          中断下载
        </button>
        <button
          className={style.classes.btn}
          disabled={props.disabled}
          onClick={props.onDownload}
        >
          下载画廊
        </button>
      </footer>
    </div>
  );
}
