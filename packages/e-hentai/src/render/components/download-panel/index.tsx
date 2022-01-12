import style from "./style.jss";

import { h } from "preact";
import { useState } from 'preact/hooks';
import { addStyle } from "@scripts/utils";
import { Tabs, IconClose } from "@scripts/components";
import { stringifyClass as cln } from "@xiao-ai/utils";

import {
  hentaiKind,
  HentaiKind,
  getAllPagesUrl,
  getImagesUrlInPage,
} from "src/utils";

import { TabEnum } from './constant';
import { Log, ImageLogData, createImageLog } from "../log";
import { Setting, defaultSetting, SettingData } from "../setting";

addStyle(style.toString());

export interface Props {
  visible: boolean;
  onClose(): void;
}

export function DownloadPanel(props: Props) {
  const [config, setConfig] = useState(defaultSetting);
  const [tabValue, setTab] = useState(TabEnum.Setting);
  const [logMsg, setLogMsg] = useState('');
  const [images, setImages] = useState([] as ImageLogData[]);
  const onSettingChange = (data: SettingData) => setConfig({
    ...config,
    ...data,
  });
  const download = async () => {
    // 切换至日志页面
    setTab(TabEnum.Log);

    // 获取链接
    const pagesUrl = getAllPagesUrl();
    const imagesUrl = getImagesUrlInPage(pagesUrl);

    setLogMsg('获取图片预览链接中...');

    let images: ImageLogData[] = [];
    let val: IteratorResult<string[], string[]> = {
      value: [],
      done: false,
    };

    while (!val.done) {
      val = await imagesUrl.next();
      images = createImageLog(val.value, images);
      setImages(images);
    }

    setLogMsg('解析所有图片预览页面...');

    debugger;

    for (const img of images) {
      // ..
    }
  };

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
        <Tabs
          value={tabValue}
          tabsData={[
            {
              name: "设置",
              value: TabEnum.Setting,
              component: (
                <Setting
                  data={config}
                  onChange={onSettingChange}
                  onDownload={download}
                />
              )
            },
            {
              name: "日志",
              value: TabEnum.Log,
              component: (
                <Log
                  message={logMsg}
                  images={images}
                />
              ),
            },
          ]}
        />
        <IconClose className={style.classes.CloseBtn} onClick={props.onClose} />
      </div>
    </div>
  );
}
