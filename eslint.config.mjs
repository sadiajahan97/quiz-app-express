import pluginJs from "@eslint/js";
import eslintImport from "eslint-plugin-import";
import globals from "globals";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    plugins: {
      eslintImport,
    },
    rules: {
      "eslintImport/order": [
        "error",
        {
          alphabetize: {
            caseInsensitive: false,
            order: "asc",
          },
          groups: [
            ["builtin"],
            ["external"],
            ["internal"],
            ["parent"],
            ["sibling"],
          ],
          "newlines-between": "always",
        },
      ],
      "sort-keys": [
        "error",
        "asc",
        {
          caseSensitive: true,
          minKeys: 2,
          natural: true,
        },
      ],
    },
    settings: {
      "import/resolver": {
        typescript: {
          project: "./tsconfig.json",
        },
      },
    },
  },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: ["dist", "node_modules"],
  },
];
