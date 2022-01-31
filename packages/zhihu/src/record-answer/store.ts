import { recordStoreKey, recordLimit } from './utils';
import { log } from '@scripts/utils';

const recordList = GM_getValue<string[]>(recordStoreKey, []);

export const getRecordList = (): Record<string, boolean> => (
  recordList
    .reduce((ans, key) => (ans[key] = true, ans), {})
);

export function addRecord(href: string) {
  const val = href.trim();

  if (!val || recordList.find((href) => href === val)) {
    return;
  }

  if (GlobalEnv.node === 'development') {
    log(`添加已读链接记录：${val}`);
  }

  recordList.push(val);

  // 位于栈头部的数据是最早的
  while (recordList.length > recordLimit) {
    recordList.shift();
  }

  GM_setValue(recordStoreKey, recordList);
}
