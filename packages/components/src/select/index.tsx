import style from './style.jss';

import { h } from 'preact';
import { addStyle } from '@scripts/utils';
import { stringifyClass as cln } from '@xiao-ai/utils';

addStyle(style.toString());

export interface SelectProps {
  className?: string;
  style?: h.JSX.CSSProperties;
  value: number;
  defaultValue?: number;
  onChange?(val: number): void;
  options: {
    name: string;
    value: number | string;
  }[];
}

export function Select(props: SelectProps) {
  return (
    <select
      style={props.style}
      value={props.value ?? props.defaultValue}
      onChange={({ currentTarget: el }) => {
        props.onChange?.(Number.parseInt(el.value));
      }}
      className={cln(style.classes.select, props.className)}
    >
      {props.options.map((opt) => (
        <option key={opt.value} value={opt.value}>{opt.name}</option>
      ))}
    </select>
  );
}
