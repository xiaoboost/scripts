import { h } from "preact";
import { useState, useRef } from 'preact/hooks';
import { download } from "@scripts/utils";
import { Tabs } from "@scripts/components";
import { delay } from "@xiao-ai/utils";

import {
  HentaiGallery,
  HentaiImage,
  format,
} from "src/utils";

import { TabEnum } from './constant';
import { Modal } from 'src/components/modal';
import { Log, LogData } from "src/components/log";
import { Setting, defaultSetting, SettingData, ImageKind, Range } from "../setting";

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
    const range = new Range(config.ranges);

    let errorStop = false;
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

    function setStopImageLog(imgIndex: number, message: string) {
      const logIndex = images.findIndex((item) => item.index === imgIndex);

      if (logIndex < 0) {
        return;
      }

      images[logIndex].error = true;
      images[logIndex].message = message;

      for (let i = logIndex + 1; i < images.length; i++) {
        images[i].message = '停止';
      }

      setLogs(images.slice());
    }

    while (!val.done) {
      val = await result.next();
      images = val.value
        .map((item) => getImageLog(item))
        .filter((item) => range.includes(item.index));

      setLogs(images);
    }

    setLogMsg('解析所有图片预览页面...');

    const galleryImages = gallery.images
      .filter((img) => range.includes(img.index));

    for (const img of galleryImages) {
      try {
        setLogMsg(`正在解析第 ${img.index} 张图片...`);

        const data = await img.getImageData();

        setLogMsg(`正在下载第 ${img.index} 张图片...`);
        updateImageLog(getImageLog(img, '下载中', false));

        const downloadUrl = config.imageKind === ImageKind.Origin
          ? data.origin?.url ?? data.priview.url
          : data.priview.url;

        await download(downloadUrl, data.name, async (blob, response) => {
          if (blob.type.includes('text/html')) {
            const htmlText = await response.text();

            errorStop = true;

            if (htmlText.includes('You have exceeded your image viewing limits')) {
              return '流量超限';
            }
            else {
              return htmlText.split('.')[0];
            }
          }
        });

        updateImageLog(getImageLog(img, '完成', false));
      }
      catch (err: any) {
        if (errorStop) {
          setStopImageLog(img.index, err.message);
          break;
        }
        else {
          updateImageLog(getImageLog(img, err.message, true));
        }
      }

      await delay(400);
    }

    const title = await gallery.getTitle();

    GM_notification({
      title,
      text: `下载${errorStop ? '未' : ''}完成，共耗时 ${format(Date.now() - startTime)}`,
    });

    setLoading(false);

    if (errorStop) {
      setLogMsg('下载出错停止');
    }
    else {
      setLogMsg('下载正常结束');
    }
  };

  if (!props.visible) {
    return null;
  }

  return (
    <Modal
      visible={props.visible}
      onClose={props.onClose}
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
    </Modal>
  );
}
