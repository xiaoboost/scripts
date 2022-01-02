import './style';

import { render, h } from 'preact';
import { log } from 'src/utils/log';
import { Button } from './render';
import { containers, SelectorName } from './constant';

/** 添加按钮 */
function appendBtn() {
  const container = document.body.querySelector(containers.join(','));

  if (!container) {
    if (process.env.NODE_ENV === 'development') {
      log('未发现容器，侧边栏按钮加载失败');
    }

    return;
  }

  let btn = document.querySelector(`.${SelectorName.SideBarBtn}`);

  if (btn) {
    if (process.env.NODE_ENV === 'development') {
      log('页面已有按钮，放弃此次加载');
    }

    return;
  }

  btn = document.createElement('div');

  render(h(Button, null), btn);
  container.appendChild(btn);

  if (process.env.NODE_ENV === 'development') {
    log('侧边栏按钮加载成功');
  }
}

/** 监听容器变化 */
function watchContainer() {
  const container = document.body.querySelector(containers.join(','));

  if (!container) {
    if (process.env.NODE_ENV === 'development') {
      log('未发现容器，监听容器变化失败');
    }

    return;
  }

  new MutationObserver(appendBtn).observe(container, {
    childList: true,
    attributes: true,
    subtree: true,
  });

  if (process.env.NODE_ENV === 'development') {
    log('容器变化监听器添加成功');
  }
}

unsafeWindow.addEventListener('load', () => {
  appendBtn();
  watchContainer();
});

GM_registerMenuCommand("屏蔽关键词",function(){
  alert('测试');
});
