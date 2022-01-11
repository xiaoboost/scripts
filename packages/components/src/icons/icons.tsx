import { h, ComponentChildren } from 'preact';
import { stringifyClass } from '@xiao-ai/utils';

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
    className={stringifyClass('blog-icon', props.className)}>
    {props.children}
  </span>;
}
