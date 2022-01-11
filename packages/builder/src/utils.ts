import path from 'path';

/** 进入命令根目录 */
export function resolve(...paths: string[]) {
  return normalize(path.join(process.cwd(), ...paths));
}

/** 路径文本格式化 */
export function normalize(input: string) {
  return input.replace(/[\\/]/g, '/');
}
