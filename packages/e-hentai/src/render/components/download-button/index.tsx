import { h } from 'preact';
import { useState } from 'preact/hooks';
import { stringifyClass } from '@xiao-ai/utils';
import { HentaiClassName as ClassName } from 'src/utils';

import { SettingPanel } from '../setting-panel';

export function MainButton() {
  const [visiblePanel, setVisible] = useState(false);

  return (
    <div className={stringifyClass(ClassName.RightAsideItem, ClassName.RightAsideSplitItem)}>
      <p style={{ margin: 0, padding: 0 }}>
        <img src="https://exhentai.org/img/mr.gif" />
        <a href="#" onClick={() => setVisible(true)}> Download Gallery</a>
      </p>

      <SettingPanel
        visible={visiblePanel}
        onClose={() => setVisible(false)}
      />
    </div>
  )
}
