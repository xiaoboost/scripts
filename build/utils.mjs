import path from 'path';
import url from "url";
import fs from 'fs';
import moment from 'moment';
import Module from 'module';

const filename = normalize(url.fileURLToPath(import.meta.url));
const dirname = normalize(path.resolve(filename, '..'));
const require = Module.createRequire(import.meta.url);

export function resolve(...dir) {
  return normalize(path.join(dirname, '..', ...dir));
}

export function normalize(input) {
  return input.replace(/[\\/]/g, '/');
}

/** 当前版本号 */
const version = require('../package.json').version;
/** 当前编译标签 */
const buildTag = moment().format('yyyy/MM/DD');
/** 当前脚本信息 */
const scriptInfo = fs.readFileSync(resolve('src/info.txt'), 'utf-8')
  .replace('${BUILD}', buildTag)
  .replace('${VERSION}', version);

export const baseConfig = {
  bundle: true,
  platform: 'browser',
  format: 'iife',
  legalComments: 'none',
  outfile: resolve('dist/index.js'),
  mainFields: ['module', 'main'],
  tsconfig: resolve('tsconfig.json'),
  entryPoints: [resolve('src/index.ts')],
  banner: {
    js: scriptInfo,
  },
  define: {
    'provess.env.BUILD': `"${buildTag}"`,
    'provess.env.VERSION': `"${version}"`,
  },
  loader: {
    '.css': 'text',
  },
};
