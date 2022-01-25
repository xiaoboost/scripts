import style from "./style.jss";

import { h } from "preact";
import { useState, useEffect } from 'preact/hooks';
import { addStyle, download } from "@scripts/utils";
import { delay, isDef, stringifyClass as cln } from "@xiao-ai/utils";
import { ClassName, HentaiGallery, format } from "src/utils";

import { Modal } from 'src/components/modal';
import { Log, LogData } from "src/components/log";
import { selected } from '../../store';

addStyle(style.toString());

export interface Props {
  visible: boolean;
  onClose(): void;
}

function spaceLog(index: number): LogData | undefined {
  const data: LogData = {
    index: index + 1,
    url: '',
    name: '',
    message: '等待中',
    error: false,
  };

  const coverEl = document.querySelectorAll(`.${ClassName.GalleryListCoverBox}`)[index];

  if (!coverEl) {
    return;
  }

  const hrefEl = coverEl.querySelector('a');
  const titleEl = coverEl.querySelector(`.${ClassName.GalleryListCoverTitle}`);

  if (!hrefEl || !titleEl) {
    return;
  }

  data.url = hrefEl.getAttribute('href')!;
  data.name = titleEl.textContent!;

  return data;
}

export function DownloadPanel(props: Props) {
  const [msg, setMsg] = useState('点击右下角“确认下载”即可开始');
  const [logs, setLogs] = useState([] as LogData[]);
  const [downloading, setLoading] = useState(false);
  const onDownload = async () => {
    const startTime = Date.now();
    const logData = logs.slice();
    const galleries = logData.map((item) => new HentaiGallery(item.url));

    let count = 0;

    setLoading(true);
    setMsg('正在下载选中画廊种子');

    for (let i = 0; i < galleries.length; i++) {
      const gallery = galleries[i];

      logData[i].message = '解析画廊种子文件下载链接';
      setLogs(logData.slice());

      try {
        const title = await gallery.getTitle();
        const torrent = await gallery.getTorrent();

        logData[i].message = '下载中';

        await download(
          torrent.url,
          `{EHT Torrent} - ${title.title ? title.title : title.subtitle}.torrent`,
        );

        logData[i].message = '下载完成';
        setLogs(logData.slice());
        count++;
      }
      catch (e: any) {
        logData[i].message = e.message;
        logData[i].error = true;
        setLogs(logData.slice());
      }

      await delay(500);
    }

    GM_notification({
      title: '下载完成',
      text: `共选中 ${galleries.length} 个种子，下载 ${count} 个, 耗时 ${format(Date.now() - startTime)}`,
    });

    setLoading(false);
    setMsg('下载完成');
  };

  useEffect(() => {
    if (!props.visible) {
      return;
    }

    const galleries = Object.entries(selected.data)
      .filter(([_, value]) => value)
      .map(([index]) => spaceLog(Number.parseInt(index)))
      .filter(isDef);

    setLogs(galleries);
  }, [props.visible]);

  if (!props.visible) {
    return null;
  }

  return (
    <Modal
      visible={props.visible}
      onClose={props.onClose}
    >
      <Log
        className={style.classes.log}
        placeholder='未选择任何画廊'
        message={msg}
        logs={logs}
      />
      {logs.length > 0 && (
        <div className={style.classes.logFooter}>
          <button
            disabled={downloading}
            onClick={onDownload}
          >
            确认下载
          </button>
        </div>
      )}
    </Modal>
  );
}
