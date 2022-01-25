import style from './style.jss';

import { h, ComponentChildren } from 'preact';
import { useRef, useState, useEffect } from 'preact/hooks';
import { addStyle, getOffset } from '@scripts/utils';
import { stringifyClass as cln } from '@xiao-ai/utils';

addStyle(style.toString());

export interface TooltipProps {
  className?: string;
  style?: h.JSX.CSSProperties;
  content: string;
  children?: ComponentChildren;
}

interface Position {
  left: number;
  top: number;
}

export function Tooltip(props: TooltipProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [position, setPosition] = useState<Position>();
  const onMouseEnter = () => {
    const { current: el } = ref;

    if (!el) {
      return;
    }

    const width = el.offsetWidth;
    const parentWidth = el.parentElement!.offsetWidth;

    if (width < parentWidth) {
      return;
    }

    const offset = getOffset(el);

    setPosition({
      left: offset.left,
      top: offset.top + el.offsetHeight + 6,
    });
  };

  return (
    <span
      ref={ref}
      className={cln(style.classes.tooltipWrapper, props.className)}
    >
      <span
        className={style.classes.tooltipChild}
        onMouseEnter={onMouseEnter}
        onMouseLeave={() => setPosition(undefined)}
      >
        {props.children}
      </span>
      <span
        className={style.classes.tooltip}
        style={{
          ...position,
          display: position ? 'flex' : 'none',
        }}
      >
        {props.content}
      </span>
    </span>
  );
}
