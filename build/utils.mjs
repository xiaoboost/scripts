import path from 'path';
import url from "url";
import fs from 'fs';
import moment from 'moment';
import Module from 'module';

const filename = normalize(url.fileURLToPath(import.meta.url));
const dirname = normalize(path.resolve(filename, '..'));

export const require = Module.createRequire(import.meta.url);

export function resolve(...dir) {
  return normalize(path.join(dirname, '..', ...dir));
}

export function normalize(input) {
  return input.replace(/[\\/]/g, '/');
}

/** 当前版本号 */
export const packageData = require('../package.json');
/** 当前编译标签 */
export const buildTag = moment().format('yyyy/MM/DD');
/** 当前脚本信息 */
export const jsBanner = fs.readFileSync(resolve('src/info.txt'), 'utf-8')
  .replace('${BUILD}', buildTag)
  .replace('${VERSION}', packageData.version);

export const baseConfig = {
  bundle: true,
  platform: 'browser',
  format: 'iife',
  minify: false,
  logLevel: 'info',
  legalComments: 'none',
  outfile: resolve('dist/index.js'),
  mainFields: ['module', 'main'],
  tsconfig: resolve('tsconfig.json'),
  entryPoints: [resolve('src/index.ts')],
  define: {
    'process.env.BUILD': `"${buildTag}"`,
    'process.env.VERSION': `"${packageData.version}"`,
  },
};
