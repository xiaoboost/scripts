import style from "./style.jss";

import { h } from "preact";
import { useState } from 'preact/hooks';
import { addStyle, download } from "@scripts/utils";
import { Tabs, IconClose } from "@scripts/components";
import { delay, stringifyClass as cln } from "@xiao-ai/utils";

import {
  hentaiKind,
  HentaiKind,
  getAllPagesUrl,
  getImagePreviewUrls,
  getImageUrlFromPreview,
  getGalleryTitle,
  ErrorCode,
  format,
} from "src/utils";

import { TabEnum } from './constant';
import { Log, ImageLogData, createImageLog, ImageStatus } from "src/components/log";
import { Setting, defaultSetting, SettingData, ImageKind } from "../setting";

addStyle(style.toString());

export interface Props {
  visible: boolean;
  onClose(): void;
}

export function DownloadPanel(props: Props) {
  const [logMsg, setLogMsg] = useState('');
  const [downloading, setLoading] = useState(false);
  const [config, setConfig] = useState(defaultSetting);
  const [tabValue, setTab] = useState(TabEnum.Setting);
  const [images, setImages] = useState([] as ImageLogData[]);
  const onSettingChange = (data: SettingData) => setConfig({
    ...config,
    ...data,
  });
  const onDownload = async () => {
    const updateImagesLog = () => setImages(images.slice());
    const startTime = Date.now();

    let images: ImageLogData[] = [];
    let val: IteratorResult<string[], string[]> = {
      value: [],
      done: false,
    };

    setTab(TabEnum.Log);
    setLoading(true);

    // 获取链接
    const pagesUrl = getAllPagesUrl();
    const imagesUrl = getImagePreviewUrls(pagesUrl);

    setLogMsg('获取图片预览链接中...');

    while (!val.done) {
      val = await imagesUrl.next();
      images = createImageLog(val.value, images);
      updateImagesLog();
    }

    setLogMsg('解析所有图片预览页面...');

    for (const img of images) {
      setLogMsg(`正在解析第 ${img.index} 张图片...`);

      const data = await getImageUrlFromPreview(img.pageUrl);

      // 发生错误，记录之后跳过
      if ('error' in data) {
        img.error = data.error;
        updateImagesLog();
        continue;
      }
      else {
        img.name = data.name;
        updateImagesLog();
      }

      setLogMsg(`正在下载第 ${img.index} 张图片...`);

      img.error = undefined;
      img.status = ImageStatus.Downloading;
      updateImagesLog();

      const downloadUrl = config.imageKind === ImageKind.Origin
        ? data.originUrl ?? data.previewUrl
        : data.previewUrl;

      const downloadResult = await download(downloadUrl, img.name);

      if (downloadResult) {
        img.error = undefined;
        img.status = ImageStatus.Downloaded;
        updateImagesLog();
      }
      else {
        img.error = ErrorCode.DownloadImage;
        img.status = ImageStatus.Error;
        updateImagesLog();
      }

      await delay(400);
    }

    GM_notification({
      text: (
        `《${getGalleryTitle()}》下载完成，` +
        `共耗时 ${format(Date.now() - startTime)}`
      ),
    });

    setLogMsg('下载结束');
    setLoading(false);
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
                  disabled={downloading}
                  onChange={onSettingChange}
                  onDownload={onDownload}
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
        <IconClose
          className={style.classes.CloseBtn}
          onClick={props.onClose}
        />
      </div>
    </div>
  );
}
