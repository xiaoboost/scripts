export function format(time: number) {
  const sec = time / 1000;
  const min = Math.floor(sec / 60);
  const restSec = sec - min * 60;

  if (min > 0) {
    return `${min} 分钟 ${restSec} 秒`;
  }
  else {
    return `${restSec} 秒`;
  }
}
