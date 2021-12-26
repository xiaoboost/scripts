import './style';

import { render, h } from 'preact';
import { log } from 'src/utils/log';
import { Button } from './render';
import { containers } from './constant';

window.addEventListener('load', () => {
  const container = document.body.querySelector(containers.join(','));

  if (!container) {
    if (process.env.NODE_ENV === 'development') {
      log('未发现容器，侧边栏按钮加载失败');
    }

    return;
  }

  const btn = document.createElement('div');

  render(h(Button, null), btn);
  container.appendChild(btn);

  if (process.env.NODE_ENV === 'development') {
    log('侧边栏按钮加载成功');
  }
});
