import { renderToDom, ClassName, IdName, isSearchPage } from 'src/utils';
import { log, onLoad } from '@scripts/utils';
import { Checkbox } from './components/checkbox';
import { MainButton } from './components/download-button';
import { selected } from './store';

export function active() {
  if (!isSearchPage()) {
    return;
  }

  onLoad(unsafeWindow, () => {
    const galleryList = document.querySelector(`#${IdName.SearchOption} + div`);
    const galleryFooter = Array.from(document.querySelectorAll(
      `.${ClassName.GalleryFooterInSearchPage}`
    ));

    if (!galleryList || galleryFooter.length === 0) {
      if (GlobalEnv.node === 'development') {
        log('未发现画廊列表，无法添加下载按钮和复选框');
      }

      return;
    }

    for (let i = 0; i < galleryFooter.length; i++) {
      galleryFooter[i].appendChild(Checkbox(`downloader-${i}`, (val) => {
        selected.setData({
          ...selected.data,
          [i]: val,
        });
      }));
    }

    if (GlobalEnv.node === 'development') {
      log('列表页复选框加载成功');
    }

    galleryList.appendChild(renderToDom(MainButton));

    if (GlobalEnv.node === 'development') {
      log('下载按钮加载成功');
    }
  });
}
