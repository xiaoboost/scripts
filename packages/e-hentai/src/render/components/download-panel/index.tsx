import style from "./style.jss";

import { h } from "preact";
import { addStyle } from "@scripts/utils";
import { Tabs, IconClose } from "@scripts/components";
import { stringifyClass as cln } from "@xiao-ai/utils";

import { hentaiKind, hentaiStyle, HentaiKind } from "src/utils";

import { Log } from "../log";
import { Setting } from "../setting";

addStyle(style.toString());

export interface Props {
  visible: boolean;
  onClose(): void;
}

export function DownloadPanel(props: Props) {
  if (!props.visible) {
    return null;
  }

  return (
    <div className={style.classes.PanelMask}>
      <div
        className={cln(style.classes.Panel, {
          [style.classes.PanelEx]: hentaiKind === HentaiKind.Ex,
          [style.classes.PanelNormal]: hentaiKind === HentaiKind.Normal,
        })}
      >
        <IconClose className={style.classes.CloseBtn} onClick={props.onClose} />
        <Tabs
          defaultValue={1}
          tabsData={[
            {
              name: "设置",
              value: 1,
              component: <Setting data={{} as any} />,
            },
            {
              name: "日志",
              value: 2,
              component: <Log />,
            },
          ]}
        />
      </div>
    </div>
  );
}
