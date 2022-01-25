import { Watcher } from '@xiao-ai/utils';
import { log } from '@scripts/utils';

export const selected = new Watcher<Record<string, boolean>>({});

if (GlobalEnv.node === 'development') {
  selected.observe((val) => {
    log('被选画廊更新', JSON.stringify(val, null, 2));
  });
}
