import style from './style.jss';

import { h } from 'preact';
import { addStyle } from '@scripts/utils';
import { stringifyClass as cln } from '@xiao-ai/utils';

addStyle(style.toString());

export interface TabsProps {
  headerStyle?: {
    color?: string;
    backgroundColor?: string;
  };
  tabs: {
    name: string;
    value: number | string;
    component(): h.JSX.Element;
  }[];
}

export function Tabs(props: TabsProps) {
  return (
    <div></div>
  );
}
