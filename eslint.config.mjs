import path from "node:path";
import { fileURLToPath } from "node:url";
import { includeIgnoreFile } from "@eslint/compat";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import * as mdx from "eslint-plugin-mdx";
import react from "eslint-plugin-react";
import globals from "globals";
import ts from "typescript-eslint";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const gitignorePath = path.resolve(__dirname, ".gitignore");

const compat = new FlatCompat();

const compatConfig = compat.config({
  extends: [
    // https://github.com/vercel/next.js/discussions/49337
    "plugin:@next/eslint-plugin-next/core-web-vitals",

    // https://github.com/facebook/react/issues/28313
    "plugin:react-hooks/recommended",
  ],
});

export default ts.config(
  includeIgnoreFile(gitignorePath),
  {
    files: ["**/*.{js,mjs,cjs,ts,md,mdx,jsx,tsx}"],
    languageOptions: {
      globals: globals.nodeBuiltin,
      parserOptions: {
        projectService: true,
        tsconfigDirName: import.meta.dirname,
      },
    },
  },
  js.configs.recommended,
  ...ts.configs.strict,
  ...ts.configs.stylistic,
  // ...ts.configs.strictTypeChecked,
  // ...ts.configs.stylisticTypeChecked,
  react.configs.flat["jsx-runtime"],
  prettier,
  ...compatConfig,
  {
    files: ["**/*.{js,md,mdx,mjs,ts,tsx}"],
    rules: {
      "@next/next/no-duplicate-head": "off",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  {
    files: ["!**/{app, components}/**"],
    ...ts.configs.disableTypeChecked,
  },
  {
    files: ["**/{app, components}/**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    rules: {
      "@typescript-eslint/consistent-type-definitions": "off",
      "@typescript-eslint/restrict-template-expressions": [
        "error",
        {
          allowNumber: true,
          allowBoolean: true,
        },
      ],
      "no-console": [
        "error",
        {
          allow: ["debug", "error", "info", "trace", "warn"],
        },
      ],
    },
  },
  {
    files: ["**/*.{md,mdx}"],
    extends: [mdx.configs.flat],
    rules: {
      "no-irregular-whitespace": "off",
      "@next/next/no-img-element": "off",

      // https://github.com/typescript-eslint/typescript-eslint/issues/9860
      "@typescript-eslint/consistent-type-imports": "off",
    },
  },
);
