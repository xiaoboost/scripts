import { MainButton } from './components/download-button';
import { renderToDom, IdName, isGalleryPage } from 'src/utils';
import { log } from '@scripts/utils';

export function active() {
  if (!isGalleryPage()) {
    return;
  }

  unsafeWindow.addEventListener('load', () => {
    const rightAside = document.querySelector(`#${IdName.RightAside}`);

    if (!rightAside) {
      if (GlobalEnv.node === 'development') {
        log('未发现侧边栏，下载按钮加载失败');
      }

      return;
    }

    rightAside.appendChild(renderToDom(MainButton));

    if (GlobalEnv.node === 'development') {
      log('下载按钮加载成功');
    }
  });
}
