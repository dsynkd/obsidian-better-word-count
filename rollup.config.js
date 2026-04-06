import typescript from "@rollup/plugin-typescript";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import copy from "rollup-plugin-copy";
import svelte from "rollup-plugin-svelte";
import sveltePreprocess from "svelte-preprocess";
const TEST_VAULT = "test-vault/.obsidian/plugins/better-word-count";

export default {
  input: "src/main.ts",
  output: {
    file: "main.js",
    sourcemap: "inline",
    format: "cjs",
    exports: "default",
  },
  external: [
    "obsidian",
    "electron",
    "codemirror",
    "@codemirror/autocomplete",
    "@codemirror/closebrackets",
    "@codemirror/collab",
    "@codemirror/commands",
    "@codemirror/comment",
    "@codemirror/fold",
    "@codemirror/gutter",
    "@codemirror/highlight",
    "@codemirror/history",
    "@codemirror/language",
    "@codemirror/lint",
    "@codemirror/matchbrackets",
    "@codemirror/panel",
    "@codemirror/rangeset",
    "@codemirror/rectangular-selection",
    "@codemirror/search",
    "@codemirror/state",
    "@codemirror/stream-parser",
    "@codemirror/text",
    "@codemirror/tooltip",
    "@codemirror/view",
    "@lezer/common",
    "@lezer/lr",
  ],
  plugins: [
    typescript({
      // Default globs use `*.ts+(|x)` which micromatch does not match nested paths (e.g. src/main.ts),
      // so the plugin never loads TS and Rollup parses `import type` as invalid JS.
      include: ["**/*.ts", "**/*.tsx"],
    }),
    nodeResolve({ browser: true }),
    commonjs(),
    svelte({
      include: "src/**/*.svelte",
      compilerOptions: { css: true },
      preprocess: sveltePreprocess(),
    }),
    copy({
      targets: [
        { src: "src/styles.css", dest: TEST_VAULT },
        { src: "main.js", dest: TEST_VAULT },
        { src: ["manifest.json"], dest: TEST_VAULT },
      ],
      flatten: true,
    }),
  ],
};
