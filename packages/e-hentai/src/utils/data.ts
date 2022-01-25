/**
 * 解析数据大小文本
 *   - 输出单位：`KB`
 *   - 解析出错时输出`-1`
 */
export function parseDataSize(str: string) {
  const val = str.trim().toLowerCase();
  const num = Number.parseFloat(val);

  if (Number.isNaN(num)) {
    return -1;
  }

  const unitRadio = {
    kb: 1,
    mb: 1024,
    gb: 1024 * 1024,
  };
  const unit = val.substring(val.length - 2, val.length);
  return num * unitRadio[unit];
}
