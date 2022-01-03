import { ZhihuClassName } from 'src/utils/constant';

/** 工具定义选择器 */
export const ClassName = {
  /** 自定义图片盒子 */
  ImageBox: 'Image-Box',
  /** 图片盒子按钮 */
  ImageBtn: 'Image-Box-Button',
  /** 隐藏侧边栏 */
  ImageBoxHide: 'Image-Box--hide',
  /** 展示侧边栏 */
  ImageBoxDefault: 'Image-Box--default',
} as const;

/** 原始图片选择器 */
export const ImageSelector = `.${ZhihuClassName.AnswerContainer} figure[data-size]`;

/** 图片是否在盒子中的标志属性名称 */
export const isInBoxAttr = 'in-box';

/** 按钮文案 */
export const btnText = ['查看图片', '隐藏图片'];
