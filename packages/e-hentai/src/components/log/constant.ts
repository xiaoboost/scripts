/** 日志数据 */
export interface LogData {
  /** 编号 */
  index: number;
  /** 项目名称 */
  name: string;
  /** 预览网址 */
  url: string;
  /** 信息 */
  message: string;
  /** 是否发生错误 */
  error?: boolean;
}
