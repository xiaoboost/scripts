import style from "./style.jss";

import { h } from "preact";
import { useState } from 'preact/hooks';
import { addStyle } from "@scripts/utils";
import { Tabs, IconClose } from "@scripts/components";
import { delay, stringifyClass as cln } from "@xiao-ai/utils";

import {
  hentaiKind,
  HentaiKind,
  getAllPagesUrl,
  downloadFile,
  getImagePreviewUrls,
  getImageUrlFromPreview,
} from "src/utils";

import { TabEnum } from './constant';
import { Log, ImageLogData, createImageLog } from "../log";
import { Setting, defaultSetting, SettingData, ImageKind } from "../setting";

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
    const imagesUrl = getImagePreviewUrls(pagesUrl);

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

    for (const img of images) {
      setLogMsg(`正在解析第 ${img.index} 张图片...`);

      const data = await getImageUrlFromPreview(img.pageUrl);

      // 发生错误，记录之后跳过
      if ('error' in data) {
        img.error = data.error;
        setImages(images.slice());
        continue;
      }

      setLogMsg(`正在下载第 ${img.index} 张图片...`);

      const downloadUrl = config.imageKind === ImageKind.Origin
        ? data.originUrl ?? data.previewUrl
        : data.previewUrl;

      await downloadFile(downloadUrl, data.name);

      break;
      // await delay(500);
    }

    setLogMsg('下载结束');
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
