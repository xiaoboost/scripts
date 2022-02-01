import { isDef } from '@xiao-ai/utils';

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

/** 范围数据 */
export interface RangeData {
  /** 范围开始的文件编号 */
  start: number;
  /** 范围结束的文件编号 */
  end?: number;
}

export interface SettingData {
  imageKind: ImageKind;
  ranges: RangeData[];
}

export const defaultRangeData: RangeData = {
  start: 1,
  end: 4000,
};

export const defaultSetting: SettingData = {
  imageKind: ImageKind.Origin,
  ranges: [{ ...defaultRangeData }],
};

/** 范围类 */
export class Range {
  private _data: RangeData[] = [];
  private _map: Record<number, boolean> = {};

  constructor(data?: RangeData[]) {
    this.push(...(data ?? []));
  }

  get ranges() {
    return this._data.slice();
  }

  get map() {
    return { ...this._map };
  }

  private getIndex() {
    return Object.keys(this._map)
      .filter((key) => Boolean(this._map[key]))
      .map((key) => Number.parseInt(key));
  }

  getMinIndex() {
    return Math.min(...this.getIndex());
  }

  getMaxIndex() {
    return Math.max(...this.getIndex());
  }

  push(...rows: RangeData[]) {
    for (const data of rows) {
      this._data.push(data);

      if (isDef(data.end)) {
        for (let i = data.start; i <= data.end; i++) {
          this._map[i] = true;
        }
      }
      else {
        this._map[data.start] = true;
      }
    }
  }

  includes(index: number) {
    return Boolean(this._map[index]);
  }
}
