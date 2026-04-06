import typescript from "@rollup/plugin-typescript";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import copy from "rollup-plugin-copy";
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
      include: ["**/*.ts", "**/*.tsx"],
    }),
    nodeResolve({ browser: true }),
    commonjs(),
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
