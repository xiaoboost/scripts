import { StyleSheet } from "jss";
import { runScript } from "../utils";
import { FileRecorder } from "./file-recorder";
import { isObject } from "@xiao-ai/utils";
import { PluginBuild, build, PartialMessage } from "esbuild";

import { promises as fs } from "fs";
import { dirname, basename } from "path";

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
        }).catch((e) => {
          return e;
        });

        if (buildResult?.errors && buildResult.errors.length > 0) {
          return {
            errors: buildResult?.errors ?? [],
            loader: "js",
            contents: "",
          };
        }

        const errors: PartialMessage[] = [];
        const jssCode = buildResult?.outputFiles[0].text;

        let jssObject: any = {};

        try {
          jssObject = runScript(jssCode ?? "", require, {
            jss,
            setTimeout: () => void 0,
          });
        }
        catch (e: any) {
          errors.push({
            pluginName: pluginName,
            text: e.message,
          });
        }

        let cssCode = "";

        if (isJssObject(jssObject)) {
          cssCode = jssObject.toString({
            indent: 0,
            format: false,
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
              classes: ${JSON.stringify(jssObject.classes)},
              toString: function() { return \`${cssCode}\`; },
            };
          `,
        };
      });
    },
  };
}
