import style from './style.jss';

import { h } from 'preact';
import { addStyle } from '@scripts/utils';
import { Tooltip } from '@scripts/components';
import { stringifyClass as cln } from '@xiao-ai/utils';
import { LogData } from './constant';

export * from './constant';

addStyle(style.toString());

export interface Props {
  className?: string;
  style?: h.JSX.CSSProperties;
  /** 日志信息 */
  message: string;
  /** 日志表单数据 */
  logs: LogData[];
  /** 日志表单为空时的文本 */
  placeholder?: string;
}

export function Log(props: Props) {
  // 数据全无
  if (props.message.length === 0 && props.logs.length === 0) {
    return (
      <div
        style={props.style}
        className={cln(style.classes.spaceBox, props.className)}
      >
        <span>当前没有日志</span>
      </div>
    );
  }

  // 有消息，无记录
  if (props.message.length > 0 && props.logs.length === 0) {
    return (
      <div
        style={props.style}
        className={cln(style.classes.box, props.className)}
      >
        <p className={style.classes.title}>{props.message}</p>
        <article
          className={style.classes.article}
          style={{ height: 200 }}
        >
          <div className={style.classes.spaceList}>
            {props.placeholder ?? '暂无记录'}
          </div>
        </article>
      </div>
    );
  }

  return (
    <div
      style={props.style}
      className={cln(style.classes.box, props.className)}
    >
      <p className={style.classes.title}>{props.message}</p>
      <article className={style.classes.article}>
        <div className={style.classes.listBox}>
          <ul className={cln(style.classes.comlunList, style.classes.indexList)}>
            {props.logs.map((log) => (
              <li
                key={log.index}
                className={style.classes.listItem}
              >
                {log.index}
              </li>
            ))}
          </ul>
          <ul className={cln(style.classes.comlunList, style.classes.nameList)}>
            {props.logs.map((log) => (
              <li
                key={log.index}
                className={style.classes.listItem}
              >
                <Tooltip content={log.name}>
                  {log.url && log.url.length > 0
                    ? <a href={log.url} target='_blank' rel='noreferrer'>{log.name}</a>
                    : <span>{log.name}</span>
                  }
                </Tooltip>
              </li>
            ))}
          </ul>
          <ul className={cln(style.classes.comlunList, style.classes.msgList)}>
            {props.logs.map((log) => (
              <li
                key={log.index}
                className={cln(style.classes.listItem, {
                  [style.classes.errorMsg]: log.error ?? false,
                })}
              >
                <Tooltip content={log.message}>{log.message}</Tooltip>
              </li>
            ))}
          </ul>
        </div>
      </article>
    </div>
  );
}
