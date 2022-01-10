import { build as esbuild, serve, formatMessages, BuildFailure } from 'esbuild';
import { getBaseConfig, cacheDir } from './utils';
import { Options } from './types';

export function build(opt: Options) {
  return esbuild(getBaseConfig(opt))
    .catch(async (data: BuildFailure) => {
      console.error(...await formatMessages(data.errors, {
        kind: 'error',
        color: true,
      }));
    });
}

export function watch(opt: Options) {
  const port = 5555;
  const host = 'localhost';

  serve(
    {
      port,
      host,
      servedir: cacheDir,
    },
    {
      ...getBaseConfig(opt),
      outfile: undefined,
    },
  )
    .then(() => {
      console.log(` 代码部署在网址: http://${host}:${port}/index.js`)
    });
}
