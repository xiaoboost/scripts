import { serve } from 'esbuild';
import { baseConfig, resolve } from './utils.mjs';

const port = 5555;
const host = 'localhost';

serve(
  {
    port,
    host,
    servedir: resolve('dist'),
  },
  {
    ...baseConfig,
    minify: false,
    sourcemap: true,
  },
);
