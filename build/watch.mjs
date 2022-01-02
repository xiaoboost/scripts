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
    define: {
      ...baseConfig.define,
      'process.env.NODE_ENV': '"development"',
    },
  },
)
  .then(() => {
    console.log(` 代码部署在网址: http://${host}:${port}/index.js`)
  });
