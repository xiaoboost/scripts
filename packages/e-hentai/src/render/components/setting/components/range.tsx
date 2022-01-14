import style from '../style.jss';

import { h } from 'preact';
import { Select, IconPlus, IconDelete, IconPlaceholder } from '@scripts/components';
import { RangeKind, RangeData, defaultRangeData } from '../constant';

export interface RangeRowProps {
  data: RangeData;
  allowDelelte?: boolean;
  disabled?: boolean;
  onDelete(): void;
  onChange(data: RangeData): void;
}

export function RangeRow(props: RangeRowProps) {
  const onChange = (data: Partial<RangeData>) => {
    props.onChange?.({
      ...props.data,
      ...data,
    });
  };

  return (
    <div className={style.classes.rangeRow}>
      <Select
        value={props.data.kind}
        disabled={props.disabled}
        defaultValue={RangeKind.Range}
        onChange={(kind: RangeKind) => onChange({ kind })}
        style={{ width: 70 }}
        options={[
          {
            name: '范围',
            value: RangeKind.Range,
          },
          {
            name: '单张',
            value: RangeKind.Single,
          },
        ]}
      />
      {props.data.kind === RangeKind.Range && (
        <input
          className={style.classes.rangeInput}
          disabled={props.disabled}
          value={props.data.start}
          onChange={({ currentTarget: el }) => {
            onChange({ start: Number.parseInt(el.value) });
          }}
          style={{ width: 60 }}
          type='number'
          min='0'
          step='1'
        />
      )}
      {props.data.kind === RangeKind.Range && (
        <span>至</span>
      )}
      {props.data.kind === RangeKind.Range && (
        <input
          className={style.classes.rangeInput}
          disabled={props.disabled}
          value={props.data.end}
          onChange={({ currentTarget: el }) => {
            onChange({ end: Number.parseInt(el.value) });
          }}
          style={{ width: 60 }}
          type='number'
          min='0'
          step='1'
        />
      )}
      {props.data.kind === RangeKind.Single && (
        <input
          className={style.classes.rangeInput}
          disabled={props.disabled}
          value={props.data.start}
          onChange={({ currentTarget: el }) => {
            onChange({ end: Number.parseInt(el.value) });
          }}
          style={{ width: 100 }}
          type='number'
          min='0'
          step='1'
        />
      )}
      {props.allowDelelte
        ? <IconDelete
          className={style.classes.rangeDelete}
          onClick={props.onDelete}
        />
        : <IconPlaceholder />
      }
    </div>
  );
}

export interface RangeBoxProps {
  data: RangeData[];
  disabled?: boolean;
  onChange(data: RangeData[]): void;
}

export function RangeBox(props: RangeBoxProps) {
  const onChange = (data: RangeData, index: number) => {
    const newList = props.data.slice();
    newList.splice(index, 1, data);
    props.onChange(newList);
  };
  const onDelete = (index: number) => {
    const newList = props.data.slice();
    newList.splice(index, 1);
    props.onChange(newList);
  };
  const onAdd = () => {
    const newList = props.data.slice();
    newList.push({ ...defaultRangeData });
    props.onChange(newList);
  };

  return (
    <div>
      {props.data.map((item, i, arr) => (
        <RangeRow
          key={i}
          data={item}
          disabled={props.disabled}
          allowDelelte={arr.length > 1}
          onDelete={() => onDelete(i)}
          onChange={(data) => onChange(data, i)}
        />
      ))}
      <div className={style.classes.rangeAdd} onClick={onAdd}>
        <IconPlus />
      </div>
    </div>
  );
}
