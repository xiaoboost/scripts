import { build } from 'esbuild';
import { baseConfig } from './utils.mjs';

build({
  ...baseConfig,
  minify: true,
  logLevel: 'info',
});
