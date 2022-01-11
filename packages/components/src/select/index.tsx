import style from './style.jss';

import { h } from 'preact';
import { useState } from 'preact/hooks';
import { addStyle } from '@scripts/utils';
import { stringifyClass as cln } from '@xiao-ai/utils';

addStyle(style.toString());

export interface SelectProps {
  className?: string;
  style?: h.JSX.CSSProperties;
  defaultValue?: number | string;
  onChange?(val: number | string): void;
  options: {
    name: string;
    value: number | string;
  }[];
}

export function Select(props: SelectProps) {
  const [val, setVal] = useState(props.defaultValue);
  const onChange = (val: number | string) => {
    props.onChange?.(val);
    setVal(val);
  };

  return (
    <select
      style={props.style}
      value={val}
      onChange={({ currentTarget: el }) => onChange(el.value)}
      className={cln(style.classes.select, props.className)}
    >
      {props.options.map((opt) => (
        <option key={opt.value} value={opt.value}>{opt.name}</option>
      ))}
    </select>
  );
}
