/** 下载图片类别 */
export enum ImageKind {
  /**
   * 原始文件
   *  - 指预览网页底部的 origin 下载链接
   */
  Origin,
  /**
   * 缩放文件
   *  - 指预览网页所显示的图片
   */
  Shrink,
}

/** 下载图片范围类别 */
export enum RangeKind {
  /** 范围 */
  Range,
  /** 单个 */
  Single,
}

export interface RangeData {
  kind: RangeKind;
  /** 范围开始的文件编号 */
  start: number;
  /** 范围结束的文件编号 */
  end?: number;
}

export interface SettingData {
  imageKind: ImageKind;
  range: RangeData[];
}

export const defaultRangeData: RangeData = {
  kind: RangeKind.Range,
  start: 1,
  end: 4000,
};

export const defaultSetting: SettingData = {
  imageKind: ImageKind.Origin,
  range: [{ ...defaultRangeData }],
};
