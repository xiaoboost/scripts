import style from './style.jss';

import { h } from 'preact';
import { addStyle } from '@scripts/utils';
import { isDef, stringifyClass as cln } from '@xiao-ai/utils';
import { LogData } from './constant';

export * from './constant';
export * from './utils';

addStyle(style.toString());

export interface Props {
  /** 日志信息 */
  message: string;
  /** 日志表单数据 */
  images: LogData[];
  /** 功能按钮 */
  button?: {
    text: string;
    onCLick(): void;
  };
}

export function Log(props: Props) {
  if (props.message.length === 0 && props.images.length === 0) {
    return (
      <div className={style.classes.spaceBox}>
        <span>当前没有日志</span>
      </div>
    );
  }

  return (
    <div className={style.classes.box}>
      <p className={style.classes.title}>{props.message}</p>
      <article
        className={style.classes.article}
        style={{ height: props.images.length === 0 ? 200 : undefined }}
      >
        {props.images.length === 0
          ? <div className={style.classes.spaceList}>
            暂无数据
          </div>
          : <ul className={style.classes.logList}>
            {props.images.map((img, i) => (
              <li key={i} className={style.classes.logItem}>
                <span className={style.classes.logIndex}>{img.index}</span>
                <span className={style.classes.logName}>
                  {img.name.length > 0 ? img.name : '还未获取'}
                </span>
                <span className={style.classes.logPreview}>
                  <a target='_blank' rel='noreferrer' href={img.pageUrl}>预览</a>
                </span>
                <span
                  className={cln(style.classes.logStatus, {
                    [style.classes.logStatusError]: isDef(img.error),
                  })}
                >
                  {isDef(img.error)
                    ? ErrorText[img.error]
                    : StatusText[img.status]
                  }
                </span>
              </li>
            ))}
          </ul>
        }
      </article>
    </div>
  );
}
