import yargs from 'yargs';

import { watch, build } from './build';

function setYargsCommand(yargs: yargs.Argv<any>) {
  return yargs.options({
    entry: {
      type: 'string',
      describe: '入口文件',
      default: './src/index.ts',
    },
    outFile: {
      type: 'string',
      describe: '输出文件',
      require: true,
    },
    infoFile: {
      type: 'string',
      describe: '脚本信息文件',
      default: './src/info.txt',
    },
    development: {
      type: 'boolean',
      describe: '调试模式',
      default: false,
    },
    production: {
      type: 'boolean',
      describe: '构建模式',
      default: false,
    },
  });
}

export function run() {
  yargs
    .command(
      'build',
      '构建脚本',
      // @ts-ignore
      yargs => setYargsCommand(yargs),
      argv => build(argv),
    )
    .command(
      'watch',
      '监听脚本变更',
      yargs => setYargsCommand(yargs),
      argv => watch(argv),
    )
    .strict()
    .showHelpOnFail(false).argv;
}
