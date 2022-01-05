import { h } from 'preact';
import { stringifyClass } from '@xiao-ai/utils';
import { HentaiClassName as ClassName } from 'src/utils';

export function MainButton() {
  return (
    <p className={stringifyClass(ClassName.RightAsideItem, ClassName.RightAsideSplitItem)}>
      <img src="https://exhentai.org/img/mr.gif" />
      <a href="#"> Download Gallery</a>
    </p>
  )
}
