import { StyleSheet } from "jss";
import { FileRecorder } from "./file-recorder";
import { isObject } from "@xiao-ai/utils";
import { runScript } from '@xiao-ai/utils/node';
import { PluginBuild, build, BuildResult, PartialMessage } from "esbuild";

import { promises as fs } from "fs";
import { dirname, basename } from "path";

import { SourceMapConsumer } from 'source-map';

import jss from 'jss';
import preset from 'jss-preset-default';

jss.setup(preset());

function isJssObject(obj: unknown): obj is StyleSheet {
  return (
    isObject(obj) && "attached" in obj && "classes" in obj && "rules" in obj
  );
}

export function JssLoader() {
  const pluginName = "loader-jss";
  const recorder = FileRecorder();
  const NameHash: Record<string, number | undefined> = {};

  function getFiles() {
    return recorder.getFiles();
  }

  return {
    name: "loader-jss",
    setup(process: PluginBuild) {
      /** 构建选项 */
      const { initialOptions: options } = process;

      process.onLoad({ filter: /\.jss\.(t|j)s$/ }, async (args) => {
        const content = await fs.readFile(args.path, "utf-8");
        const buildResult = await build({
          bundle: true,
          minify: false,
          write: false,
          format: "cjs",
          platform: "node",
          outdir: "/",
          logLevel: "warning",
          charset: "utf8",
          sourcemap: true,
          mainFields: options.mainFields,
          assetNames: options.assetNames,
          publicPath: options.publicPath,
          define: options.define,
          loader: options.loader,
          external: ["jss", "jss-preset-default"],
          stdin: {
            contents: content,
            resolveDir: dirname(args.path),
            sourcefile: basename(args.path),
            loader: "ts",
          },
        }).catch((e: BuildResult) => {
          return e;
        });

        if (buildResult.errors.length > 0) {
          return {
            errors: buildResult.errors ?? [],
            warnings: buildResult.warnings ?? [],
            loader: "js",
            contents: "",
          };
        }

        const errors: PartialMessage[] = [];
        const files = buildResult?.outputFiles ?? [];
        const jssCode = files.find((file) => file.path.endsWith('.js'))?.text ?? '';
        const result = runScript(jssCode, {
          dirname: __dirname,
          filename: 'jss-bundle.js',
          globalParams: {
            jss,
            NameHash,
            setTimeout: () => void 0,
          },
        });

        let cssCode = "";

        if (result.error) {
          const sourceMapCode = files.find((file) => file.path.endsWith('.map'))?.text ?? '';
          const sourceMapData = JSON.parse(sourceMapCode);
          const map = await new SourceMapConsumer(sourceMapData);
          const originLocation = map.originalPositionFor({
            line: result.error.location?.line ?? 1,
            column: result.error.location?.column ?? 1,
          });

          if (originLocation.line) {
            errors.push({
              pluginName: pluginName,
              text: result.error.message,
              location: {
                file: originLocation.source ?? undefined,
                line: originLocation.line ?? undefined,
                column: originLocation.column ?? undefined,
                lineText: result.error.location?.lineText,
              },
            });
          }
          else {
            errors.push({
              pluginName: pluginName,
              text: result.error.message,
            });
          }
        }
        else if (isJssObject(result.output)) {
          cssCode = result.output.toString({
            indent: 0,
            format: true,
            allowEmpty: false,
          });
        }
        else {
          errors.push({
            pluginName: pluginName,
            text: "default 导出应该是个 jss 实例",
          });
        }

        return {
          errors,
          loader: "js",
          watchFiles: getFiles(),
          contents: `
            export default {
              classes: ${JSON.stringify(result.output.classes ?? {})},
              toString: function() { return \`${cssCode}\`; },
            };
          `,
        };
      });
    },
  };
}
