import js from "@eslint/js";
import ts from "typescript-eslint";
import gb from "eslint-plugin-gb";
import svelte from "eslint-plugin-svelte";
import globals from "globals";

/** @type {import('eslint').Linter.Config[]} */
export default [
  js.configs.recommended,
  ...ts.configs.recommended,
  ...svelte.configs["flat/recommended"],
  // ...svelte.configs["flat/prettier"],
  ...gb.configs["flat/recommended"],
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        NodeListOf: true,
      },
    },
  },
  {
    files: ["**/*.svelte"],
    languageOptions: {
      parserOptions: {
        parser: ts.parser,
      },
    },
  },
  {
    ignores: [
      ".nx/",
      "build/",
      ".svelte-kit/",
      "**/*.config.*",
      ".vercel/",
      "dist/",
    ],
  },
];
