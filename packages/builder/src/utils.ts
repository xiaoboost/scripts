import path from 'path';
import fs from 'fs';
import moment from 'moment';

import { BuildOptions } from 'esbuild';
import { Options } from './types';

export function resolve(...paths: string[]) {
  return normalize(path.join(process.cwd(), ...paths));
}

export function normalize(input: string) {
  return input.replace(/[\\/]/g, '/');
}

/** 当前编译标签 */
export const buildTag = moment().format('yyyy/MM/DD');
/** 缓存目录 */
export const cacheDir = path.join(__dirname, '../cache');

export function getBaseConfig(opt: Options): BuildOptions {
  const packageData = JSON.parse(fs.readFileSync(resolve('package.json'), 'utf-8'));
  const jsBanner = fs.readFileSync(resolve(opt.infoFile), 'utf-8')
    .replace('${BUILD}', buildTag)
    .replace('${VERSION}', packageData.version)
    .replace(
      '${NAME}',
      opt.production
        ? packageData.displayName
        : `${packageData.displayName}-调试`,
    );
  const mode = opt.production
    ? 'production'
    : opt.development
      ? 'development'
      : '';

  return {
    bundle: true,
    platform: 'browser',
    format: 'iife',
    minify: false,
    treeShaking: true,
    logLevel: 'info',
    legalComments: 'none',
    outfile: resolve(opt.outFile),
    mainFields: ['source', 'module', 'main'],
    tsconfig: resolve('tsconfig.json'),
    entryPoints: [resolve(opt.entry)],
    banner: {
      js: jsBanner,
    },
    define: {
      'process.env.BUILD': `"${buildTag}"`,
      'process.env.VERSION': `"${packageData.version}"`,
      'process.env.NODE_ENV': `"${mode}"`,
    },
  };
}
