/** 工具定义选择器 */
export const SelectorName = {
  SideBarBtn: 'SideBar-Button',
  /** 隐藏侧边栏 */
  SideBarBtnHide: 'SideBar-Button--hide',
  /** 展示侧边栏 */
  SideBarBtnDefault: 'SideBar-Button--default',
  /** 主页面占满宽度 */
  WidthFullMain: 'Zhihu-Width-Full',
};

/** 状态储存 */
export const StoreKey = 'hide-sidebar';

/** 状态枚举 */
export enum Status {
  /** 默认状态 */
  Default,
  /** 隐藏侧边栏 */
  Hide,
}

/** 命令名称 */
export const CommandName = {
  [Status.Default]: '隐藏侧边栏',
  [Status.Hide]: '恢复侧边栏',
};
