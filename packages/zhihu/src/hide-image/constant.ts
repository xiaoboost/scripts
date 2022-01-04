import { ZhihuClassName } from 'src/utils/constant';

/** 工具定义选择器 */
export const SelectorName = {
  ImageBox: 'Image-Box',
  /** 隐藏侧边栏 */
  ImageBoxHide: 'Image-Box--hide',
  /** 展示侧边栏 */
  ImageBoxDefault: 'Image-Box--default',
};

/** 原始图片选择器 */
export const ImageSelector = `.${ZhihuClassName.AnswerContainer} figure[data-size]`;

/** 图片是否在盒子中的标志属性名称 */
export const isInBoxAttr = 'in-box';
