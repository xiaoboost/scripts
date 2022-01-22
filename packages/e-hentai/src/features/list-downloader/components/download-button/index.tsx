import style from './style.jss';

import { h } from 'preact';
import { useState } from 'preact/hooks';
import { addStyle } from "@scripts/utils";
import { stringifyClass } from '@xiao-ai/utils';
import { ClassName } from 'src/utils';

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
    </div>
  )
}
