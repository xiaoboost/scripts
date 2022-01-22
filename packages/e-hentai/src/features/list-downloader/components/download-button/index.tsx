import style from './style.jss';

import { h } from 'preact';
import { useState } from 'preact/hooks';
import { addStyle } from "@scripts/utils";
import { DownloadPanel } from '../download-panel';

addStyle(style.toString());

export function MainButton() {
  const [visiblePanel, setVisible] = useState(false);

  return (
    <div className={style.classes.downloadBtnWrapper}>
      <input
        type='button'
        value='Download Galleries'
        className={style.classes.downloadBtn}
        onClick={() => setVisible(true)}
      />

      <DownloadPanel
        visible={visiblePanel}
        onClose={() => setVisible(false)}
      />
    </div>
  )
}
