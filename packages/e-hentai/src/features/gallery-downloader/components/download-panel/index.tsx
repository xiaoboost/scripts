import style from "./style.jss";

import { h } from "preact";
import { useState, useRef } from 'preact/hooks';
import { addStyle, download } from "@scripts/utils";
import { Tabs, IconClose } from "@scripts/components";
import { delay, stringifyClass as cln } from "@xiao-ai/utils";

import {
  hentaiKind,
  HentaiKind,
  HentaiGallery,
  HentaiImage,
  format,
} from "src/utils";

import { TabEnum } from './constant';
import { Log, LogData } from "src/components/log";
import { Setting, defaultSetting, SettingData, ImageKind } from "../setting";

addStyle(style.toString());

export interface Props {
  visible: boolean;
  onClose(): void;
}

export function DownloadPanel(props: Props) {
  // 日志数据
  const [logMsg, setLogMsg] = useState('');
  const [logs, setLogs] = useState([] as LogData[]);

  // 面板状态
  const [downloading, setLoading] = useState(false);
  const [config, setConfig] = useState(defaultSetting);
  const [tabValue, setTab] = useState(TabEnum.Setting);

  // 画廊数据
  const { current: gallery } = useRef(new HentaiGallery(location.href, document));

  const onSettingChange = (data: SettingData) => setConfig({
    ...config,
    ...data,
  });
  const onDownload = async () => {
    const startTime = Date.now();

    setTab(TabEnum.Log);
    setLoading(true);
    setLogMsg('获取图片预览链接中...');

    const result = gallery.getImages();

    let images: LogData[] = [];
    let val: IteratorResult<HentaiImage[], HentaiImage[]> = {
      value: [],
      done: false,
    };

    function getImageLog(img: HentaiImage, message?: string, isError?: boolean): LogData {
      return {
        index: img.index,
        name: img.data?.name ?? '未获得',
        url: img.url,
        message: message ?? '等待中',
        error: isError ?? false,
      };
    }

    function updateImageLog(data: LogData) {
      const index = images.findIndex((item) => item.index === data.index);

      if (index > -1) {
        images.splice(index, 1, data);
      }
      else {
        images.push(data);
      }

      setLogs(images.slice());
    }

    while (!val.done) {
      val = await result.next();
      images = val.value.map((item) => getImageLog(item));
      setLogs(images);
    }

    setLogMsg('解析所有图片预览页面...');

    for (const img of gallery.images) {
      try {
        setLogMsg(`正在解析第 ${img.index} 张图片...`);

        const data = await img.getImageData();

        setLogMsg(`正在下载第 ${img.index} 张图片...`);
        updateImageLog(getImageLog(img, '下载中', false));

        const downloadUrl = config.imageKind === ImageKind.Origin
          ? data.origin?.url ?? data.priview.url
          : data.priview.url;

        await download(downloadUrl, data.name);

        updateImageLog(getImageLog(img, '完成', false));
      }
      catch (err: any) {
        updateImageLog(getImageLog(img, err.message, true));
      }

      await delay(400);
    }

    const title = await gallery.getTitle();

    GM_notification({
      title: title.title.length > 0
        ? title.title
        : title.subtitle,
      text: `下载完成，共耗时 ${format(Date.now() - startTime)}`,
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
                  logs={logs}
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
