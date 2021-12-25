const prefix = '[zhihu-utils]';

export function log(...message: any[]) {
  if (process.env.NODE_ENV === 'development') {
    console.log(prefix, ...message);
  }
}
