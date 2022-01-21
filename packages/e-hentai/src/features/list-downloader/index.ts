import { renderToDom, IdName, isSearchPage } from 'src/utils';
import { log } from '@scripts/utils';

export function active() {
  if (!isSearchPage()) {
    return;
  }

  // ..
}
