import style from './style.jss';

import { h } from 'preact';
import { useState } from 'preact/hooks';
import { addStyle } from '@scripts/utils';
import { stringifyClass as cln } from '@xiao-ai/utils';

addStyle(style.toString());

export interface TabsProps {
  className?: string;
  style?: h.JSX.CSSProperties;
  highlightColor?: string;
  defaultValue?: number | string;
  tabsData: {
    name: string;
    value: number | string;
    component: h.JSX.Element;
  }[];
}

export function Tabs(props: TabsProps) {
  const [state, setState] = useState(props.defaultValue);

  return (
    <div style={props.style} className={cln(style.classes.tabBox, props.className)}>
      <header className={style.classes.tabHeader} style={props.style}>
        <ul className={style.classes.tabNavList}>
          {props.tabsData.map((item) => (
            <li
              key={item.value}
              onClick={() => setState(item.value)}
              className={cln(style.classes.tabNavItem, {
                [style.classes.tabMavHighlight]: state === item.value,
              })}
            >
              {item.name}
            </li>
          ))}
        </ul>
      </header>
      <article className={style.classes.tabBody}>
        {props.tabsData.map((item) => (
          <div
            key={item.value}
            style={{
              display: state === item.value ? 'block' : 'none'
            }}
          >
            {item.component}
          </div>
        ))}
      </article>
    </div>
  );
}
