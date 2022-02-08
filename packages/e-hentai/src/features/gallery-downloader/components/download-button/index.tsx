import style from './style.jss';

import { h } from 'preact';
import { useState } from 'preact/hooks';
import { stringifyClass } from '@xiao-ai/utils';
import { addStyle } from '@scripts/utils';
import { ClassName } from 'src/utils';

import { rightArrow } from './constant';
import { DownloadPanel } from '../download-panel';

addStyle(style.toString());

export function MainButton() {
  const [visiblePanel, setVisible] = useState(false);

  return (
    <div className={stringifyClass(ClassName.RightAsideItem, ClassName.RightAsideSplitItem)}>
      <p style={{ margin: 0, padding: 0 }}>
        <img src={rightArrow} />
        <a className={style.classes.downBtn} onClick={() => setVisible(true)}> Download Gallery</a>
      </p>

      <DownloadPanel
        visible={visiblePanel}
        onClose={() => setVisible(false)}
      />
    </div>
  )
}
