import style from './style.jss';

import { h, ComponentChildren } from 'preact';
import { addStyle } from '@scripts/utils';
import { stringifyClass } from '@xiao-ai/utils';

addStyle(style.toString());

export type IconProps = h.JSX.HTMLAttributes;

interface IconCreatorProps {
  name: string;
  className?: string;
  children?: ComponentChildren;
}

export function IconCreator(props: IconCreatorProps) {
  return <span
    {...props}
    aria-label={props.name}
    className={stringifyClass(style.classes.icon, props.className)}>
    {props.children}
  </span>;
}
