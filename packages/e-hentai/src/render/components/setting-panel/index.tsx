import style from './style.jss';

import { h } from 'preact';

export interface Props {
  visible: boolean;
  onClose(): void;
}

export function SettingPanel(props: Props) {
  if (!props.visible) {
    return null;
  }

  /**
   * 选择文件类别
   *  - 原始文件（如果有）
   *  - 压缩文件
   *
   * 选择下载范围
   *  - 默认全部
   *  - 单个
   *  - 范围
   *  - 增加和删除按钮
   *
   * 下载按钮 / 关闭按钮
   *
   * 下载日志
   *  - 收集所有文件下载链接
   *  - 逐个下载
   */

  return (
    <div className={style.classes.PanelMask}>
      <div className={style.classes.Panel}>
        内容
      </div>
    </div>
  );
}
