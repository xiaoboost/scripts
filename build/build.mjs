import { build } from 'esbuild';
import { baseConfig, jsBanner, packageData } from './utils.mjs';

build({
  ...baseConfig,
  banner: {
    js: jsBanner.replace('${NAME}', packageData.displayName),
  },
});
