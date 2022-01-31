import { ZhihuClassName } from 'src/utils/constant';

/** 是主页 */
export function isMainPage() {
  return location.pathname.startsWith('/follow');
}

/** 记录数据上限 */
export const recordLimit = 100;
/** 记录数据保存键名 */
export const recordStoreKey = 'record-answer';
/** 绑定事件标记属性 */
export const bindEventAttr = 'bind-record-event';
/** 列表容器选择器 */
export const listSelector = `.${ZhihuClassName.MainQuestionListContainer} > div`;
