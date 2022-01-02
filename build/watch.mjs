import { serve } from 'esbuild';
import { baseConfig, jsBanner, resolve, packageData } from './utils.mjs';

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
    sourcemap: true,
    banner: {
      js: jsBanner.replace('${NAME}', `${packageData.displayName}-调试`),
    },
  },
);
