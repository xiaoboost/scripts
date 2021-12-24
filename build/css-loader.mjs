import fs from 'fs';
import path from 'path';

import CleanCSS from 'clean-css';

export function CssLoader() {
  return {
    name: 'css-loader',
    setup(esbuild) {
      const cleaner = new CleanCSS();

      esbuild.onLoad({ filter: /\.css$/ }, async (args) => {
        try {
          const code = await fs.promises.readFile(args.path, 'utf-8');

          return {
            loader: 'text',
            contents: cleaner.minify(code).styles,
            resolveDir: path.dirname(args.path),
          };
        }
        catch (e) {
          return {
            errors: [{
              text: e.message,
            }],
          };
        }
      });
    },
  };
}
